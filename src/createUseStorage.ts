import { useCallback, useEffect, useState } from "react";
import usePersistedCallback from "./usePersistedCallback";
import useUpdate from "./useUpdate";
import { canUseDOM } from "./utils";

function createUseStorage(type: "local" | "session") {
  let storage: Storage;

  if (!canUseDOM) {
    return useNoop as typeof useStorage;
  }

  if (type === "local") storage = localStorage;
  if (type === "session") storage = sessionStorage;

  function useStorage<T = any>(
    key: string,
    defaultValue?: T,
    options?: {
      serialize?: (value: T) => string;
      deserialize?: (raw: string) => T;
    }
  ) {
    const serialize =
      options && options.serialize
        ? options.serialize
        : (JSON.stringify as (value: T) => string);

    const deserialize =
      options && options.deserialize
        ? options.deserialize
        : (JSON.parse as (raw: string) => T);

    const getDefaultValue = usePersistedCallback(() => {
      return defaultValue !== undefined ? defaultValue : null;
    });

    const getItem = usePersistedCallback(() => {
      try {
        const raw = storage.getItem(key);
        return raw !== null ? deserialize(raw) : getDefaultValue();
      } catch (error) {
        return getDefaultValue();
      }
    });

    const setItem = usePersistedCallback((value: T) => {
      try {
        storage.setItem(key, serialize(value));
      } catch (error) {}
    });

    const removeItem = usePersistedCallback(() => {
      storage.removeItem(key);
    });

    const [value, setValue] = useState(getItem());

    const set = useCallback(
      (newValue: T) => {
        setItem(newValue);
        setValue(newValue);
      },
      // eslint-disable-next-line
      []
    );

    const remove = useCallback(
      () => {
        removeItem();
        setValue(getItem());
      },
      // eslint-disable-next-line
      []
    );

    useUpdate(
      () => {
        setValue(getItem());
      },
      // eslint-disable-next-line
      [key, defaultValue]
    );

    useEffect(
      () => {
        function listener(event: StorageEvent) {
          if (event.storageArea === storage && event.key === key) {
            setValue(getItem());
          }
        }
        window.addEventListener("storage", listener);
        return () => window.removeEventListener("storage", listener);
      },
      // eslint-disable-next-line
      [key]
    );

    return [value, { set, remove }] as const;
  }

  return useStorage;
}

function useNoop<T>(key: string, defaultValue?: T) {
  const getDefaultValue = usePersistedCallback(() => {
    return defaultValue !== undefined ? defaultValue : null;
  });

  const [value, setValue] = useState(getDefaultValue());

  const set = useCallback((newValue: T) => {
    setValue(newValue);
  }, []);

  const remove = useCallback(
    () => {
      setValue(getDefaultValue());
    },
    // eslint-disable-next-line
    []
  );

  useUpdate(
    () => {
      setValue(getDefaultValue());
    },
    // eslint-disable-next-line
    [defaultValue]
  );

  return [value, { set, remove }] as const;
}

export default createUseStorage;
