import * as R from 'ramda';

class Maybe<T> {
    value: T;
    constructor(v: T) {
        this.value = v;
    }
    map = <W>(f: (v: T) => W): Maybe<W> => Maybe.of(f(this.value));
    ap = <W>(m: Maybe<any>) => new Maybe((this as Maybe<(v: T) => W>).value(m.value));
    static of = <T>(v: T) => new Maybe<T>(v);
}

() => {
    const list: Maybe<number>[] = R.map(Maybe.of, [1, 2, 3]);
    const res: Maybe<number[]> = R.sequence(Maybe.of, list);
    res instanceof Maybe; // true
    res.value; // [1, 2, 3]
};
