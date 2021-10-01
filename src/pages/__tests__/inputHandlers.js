
import {cleanup, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import { handleEmail, isValidHumanName } from '../utils/inputHandler'

afterEach(cleanup);

it("Email checker catches empty email", () => {
    expect(handleEmail("")).toEqual(0);
})

it("Correctly identifies a@m.c as too few characters", () => {
    expect(handleEmail("a@m.c")).toEqual(1);
})

it("Correctly identifies me@email as invalid email", () => {
    expect(handleEmail("me@email")).toEqual(false);
})

it("Correctly identifies me@domain.ext as a valid email address", () => {
    expect(handleEmail("me@domain.ext")).toEqual(true);
})

// Test for isValidHumanName

it("isValidHumanName checker catches empty name", () => {
    expect(isValidHumanName("")).toEqual(0);
})

it("isValidHumanName checker identifies 'a' as invalid name with too few characters", () => {
    expect(isValidHumanName("a")).toEqual(1);
})

it("isValidHumanName checker identifies 'Ab' as invalid name with too few characters", () => {
    expect(isValidHumanName("Ab")).toEqual(1);
})

it("isValidHumanName checker identifies 'a111' as invalid name containing invalid characters", () => {
    expect(isValidHumanName("a111")).toEqual(false);
})

it("isValidHumanName checker identifies '11111' as invalid name containing invalid characters", () => {
    expect(isValidHumanName("11111")).toEqual(false);
})

it("isValidHumanName checker correctly identifies 'Samuel' as a valid name", () => {
    expect(isValidHumanName("Samuel")).toEqual(true);
})

