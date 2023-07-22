// import { isMatch, parse } from 'date-fns';
import { ChangeEvent, LegacyRef, MutableRefObject, RefCallback } from 'react';

export function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

const typeOf = (value: any) =>
  Object.prototype.toString
    .call(value)
    .match(/\s([a-zA-Z]+)/)?.[1]
    .toLowerCase();

// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(x: any): x is Function {
  return typeOf(x) === 'function';
}

function isObject(x: any): x is object {
  return typeOf(x) === 'object';
}

function isString(x: any): x is string {
  return typeOf(x) === 'string';
}

function isNumber(x: any): x is number {
  return typeOf(x) === 'number';
}

function isArray(x: any): x is any[] {
  return typeOf(x) === 'array';
}

function isUndefined(x: any): x is undefined {
  return typeOf(x) === 'undefined';
}

function isNull(x: any): x is null {
  return typeOf(x) === 'null';
}

function noop() {
  /* do nothing */
}

function createCustomInputEvent({
  name,
  value,
}: {
  name?: string;
  value: string | string[] | Array<number | null>;
}) {
  const newEvent = new Event('input');
  const newEventTarget = new EventTarget();
  return {
    ...newEvent,
    target: { ...(newEvent.target || newEventTarget), name: name ?? 'name', value: value ?? '' },
  } as unknown as ChangeEvent<HTMLInputElement>;
}

// function parseDateUsingDateFormat(date: string | null, dateformat: string) {
//   if (date && isMatch(date, dateformat)) {
//     return parse(date, dateformat, new Date());
//   } else {
//     return null;
//   }
// }

function addLeadingZeros(totalLength: number) {
  return (num: number) => String(num).padStart(totalLength, '0');
}

function isVisible(element: HTMLElement | SVGGraphicsElement): boolean {
  if (!element) {
    return false;
  }

  if (element instanceof HTMLElement && element.offsetParent) {
    return true;
  }

  if (element instanceof SVGGraphicsElement && element.getBBox) {
    const { width, height } = element.getBBox();
    if (width || height) {
      return true;
    }
  }

  if (element instanceof HTMLElement && element.getBoundingClientRect) {
    const { width, height } = element.getBoundingClientRect();
    if (width || height) {
      return true;
    }
  }

  return false;
}

function mergeRefs<T = any>(
  ...refs: Array<LegacyRef<T> | MutableRefObject<T> | undefined>
): RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }
      if (isFunction(ref)) {
        ref(value);
        return;
      }
      (ref as MutableRefObject<T | null>).current = value;
      return;
    });
  };
}

// function createUUID(prefix = 'jf-uuid') {
//   let count = 0;
//   return () => {
//     count++;
//     return `${prefix}-${count}`;
//   };
// }

// const uuid = createUUID();

// export {
//   ascend,
//   clone,
//   compose,
//   isEmpty,
//   equals as isEqual,
//   isNil,
//   prop,
//   range,
//   sort,
//   uniq,
// } from 'ramda';
export {
  addLeadingZeros,
  createCustomInputEvent,
  isArray,
  isFunction,
  isNull,
  isNumber,
  isObject,
  isString,
  isUndefined,
  isVisible,
  mergeRefs,
  noop,
};
