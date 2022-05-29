import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";

// See: https://usehooks-ts.com/react-hook/use-event-listener
import { useEventListener } from "usehooks-ts";

declare global {
	interface WindowEventMap {
		"local-storage": CustomEvent;
	}
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(
	key: string,
	initialValue: T,
	expiryTime: number
): [T, SetValue<T>] {
	interface expireStore {
		expiry: number;
		object: T;
	}
	// Get from local storage then
	// parse stored json or return initialValue
	const readValue = useCallback((): T => {
		// Prevent build error "window is undefined" but keep keep working
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			const item = window.localStorage.getItem(key);
			const now = new Date();
			const parsed = item ? (parseJSON(item) as expireStore) : null;
			return parsed
				? now.getTime() > parsed.expiry
					? initialValue
					: parsed.object
				: initialValue;
		} catch (error) {
			console.warn(`Error reading localStorage key “${key}”:`, error);
			return initialValue;
		}
	}, [initialValue, key]);

	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<T>(readValue);

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue: SetValue<T> = useCallback(
		(value) => {
			// Prevent build error "window is undefined" but keeps working
			if (typeof window == "undefined") {
				console.warn(
					`Tried setting localStorage key “${key}” even though environment is not a client`
				);
			}

			try {
				// Allow value to be a function so we have the same API as useState
				const newValue =
					value instanceof Function ? value(storedValue) : value;
				const now = new Date();
				const setExpire = {
					expiry: now.getTime() + expiryTime,
					object: newValue,
				};
				// Save to local storage
				window.localStorage.setItem(key, JSON.stringify(setExpire));

				// Save state
				setStoredValue(newValue);

				// We dispatch a custom event so every useLocalStorage hook are notified
				window.dispatchEvent(new Event("local-storage"));
			} catch (error) {
				console.warn(`Error setting localStorage key “${key}”:`, error);
			}
		},
		[expiryTime, key, storedValue]
	);

	useEffect(() => {
		setStoredValue(readValue());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleStorageChange = useCallback(() => {
		setStoredValue(readValue());
	}, [readValue]);

	// this only works for other documents, not the current one
	useEventListener("storage", handleStorageChange);

	// this is a custom event, triggered in writeValueToLocalStorage
	// See: useLocalStorage()
	useEventListener("local-storage", handleStorageChange);

	return [storedValue, setValue];
}

export default useLocalStorage;

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
	try {
		return value === "undefined" ? undefined : JSON.parse(value ?? "");
	} catch {
		console.log("parsing error on", { value });
		return undefined;
	}
}
