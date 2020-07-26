import test from 'tape'

import { incrementAsync, delay } from './sagas'
import { put, call } from 'redux-saga/effects'

test('incrementAsync saga test', (assert) => {
    const gen = incrementAsync()

    assert.deepEqual(
        gen.next().value,
        call(delay, 1000),
        'incrementAsync should return a Promise that will resolve after 1 second'
    )

    assert.deepEqual(
        gen.next().value,
        put({ type: 'INCREMENT' }),
        'incrementAsync saga must dispatch an INCREMENT action'
    )

    assert.deepEqual(
        gen.next(),
        { done: true, value: undefined },
        'incrementAsync saga must be done'
    )

    assert.end()
})