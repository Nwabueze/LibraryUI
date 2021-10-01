
import {cleanup, render} from '@testing-library/react'
import '@testing-library/jest-dom'


afterEach(cleanup);

it("Test is working", () => {
    expect(3/3).toEqual(1);
})

it("Empty is working", () => {
    expect("".match(/\d+/)).toEqual(null);
})
