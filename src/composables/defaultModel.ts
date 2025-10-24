type Hints<T> = Partial<Record<keyof T & string, any>>;

function inferDefaultByName(name: string) {
  const lower = name.toLowerCase();
  if (/(^is|^has|^should|^can)/.test(lower)) return false;
  if (/(id$|count|num|age|total|price|quantity)/.test(lower)) return 0;
  if (/(date|time|at)$/.test(lower)) return null; // можно поменять на new Date(0)
  if (/(list|items|array|values|tags|ids|children|rows)$/.test(lower)) return [];
  if (/(name|title|label|description|address|email|phone|text)/.test(lower)) return "";
  return ""; // общий fallback — пустая строка
}

export function createEmptyMock<T>(hints: Hints<T> = {}): T {
  const target = {};

  return new Proxy(target, {
    get: (_t, prop) => {
      // 1) Если prop — символ (например Vue/JS internals), возвращаем undefined,
      //    чтобы не ломать поведение систем, которые ожидают отсутствие свойства.
      if (typeof prop === "symbol") {
        return undefined;
      }

      // 2) Приводим prop к строке безопасно (числа -> "123", Symbol уже отработан)
      const key = String(prop);

      // 3) Если есть подсказка — используем её
      if (key in hints) return (hints as any)[key];

      // 4) Инферим дефолт по имени
      const inferred = inferDefaultByName(key);

      // 5) Для часто вызываемых методов возвращаем функции (чтобы Vue/JSON.stringify/console и т.д. не падали)
      if (key === "toString") return () => (inferred === null ? "null" : String(inferred));
      if (key === "valueOf") return () => inferred;
      if (key === "toJSON") return () => inferred;
      if (key === "inspect") return () => inferred; // node util.inspect

      // 6) Вернуть инферированный дефолт
      return inferred;
    },

    // Доп. хендлеры делают объект более "дружелюбным" для библиотек, которые проверяют перечислимые ключи
    has: (_t, _p) => true,
    ownKeys: () => [],
    getOwnPropertyDescriptor: (_t, _p) => ({ configurable: true, enumerable: true, value: undefined })
  }) as T;
}

