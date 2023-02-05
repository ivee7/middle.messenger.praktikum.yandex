export type Indexed<T = any> = {
    [key in string]: T;
};

export const formatDate = (day: Date) => {
    const oneDay = 86400000;
    const week = oneDay * 7;
    const now = new Date();
    const format = (date: Date, options: Intl.DateTimeFormatOptions) => {
      const dtf = new Intl.DateTimeFormat('ru-RU', options);
      return dtf.format(date);
    };

    if (Number(now) - Number(day) < oneDay) {
      return format(day, {hour: 'numeric', minute: 'numeric'});
    } else if (Number(now) - Number(day) < week) {
      return format(day, {weekday: 'short'});
    } else {
      return format(day, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    }
};

export const isObject = (object: Indexed | unknown):object is Indexed => {
    return typeof object === 'object' && object !== null
}

export const isEqual = (lhs: object, rhs: object): boolean => {
    if (lhs === rhs) {
        return true;
    }

    if (!isObject(lhs) || !isObject(rhs)) {
        return false;
    }

    const keysA = Reflect.ownKeys(lhs);
    const keysB = Reflect.ownKeys(rhs);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let i = 0; i < keysA.length; i++) {
        if (
        !Reflect.has(rhs, keysA[i]) ||
        !isEqual(lhs[keysA[i] as string], rhs[keysA[i] as string])
        ) {
        return false;
        }
    }

    return true;
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
    for (let p in rhs) {
        if (!rhs.hasOwnProperty(p)) {
        continue;
        }

        try {
        if (rhs[p].constructor === Object) {
            rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
        } else {
            lhs[p] = rhs[p];
        }
        } catch (e) {
        lhs[p] = rhs[p];
        }
    }

    return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
    if (typeof object !== 'object' || object === null) {
        return object;
    }

    if (typeof path !== 'string') {
        throw new Error('path must be string');
    }

    const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
        [key]: acc,
    }), value as any);

    return merge(object as Indexed, result);
}
