export interface ProblemInterface {
    id: number,
    name: string,
    description: string,
    difficulty: string,
    displayTestCases: {
        input: {},
        outputReal: string
    }[],
    realTestCases: {
        input: string,
        output: string,
    }[],
    hiddenTestCases: {
        input: string,
        outputReal: string
    }[],
    inputFormat: string,
    outputFormat: string,
    constraintsTime: string,
    constraintsSpace: string
}

export const problemSet: ProblemInterface[] = [
    {
        id: 5,
        name: 'Two Guys One Girl',
        description: 'You shall be given an array of n elements. The array shall be an array of integers and there shall not be any duplicates. You shall also be given an integer k. You have to find out whether it is possible to find two elements in the array whose sum is exactly equal to k.',
        difficulty: 'Easy',
        displayTestCases: [
            {
                input: {
                    n: 8,
                    array: "1 2 3 4 5 6 7 8",
                    k: 10
                },
                outputReal: "true"
            },
            {
                input: {
                    n: 5,
                    array: '32 34 81 23 13',
                    k: 12
                },
                outputReal: "false"
            }
        ],
        realTestCases: [
            {
                input: `8 1 2 3 4 5 6 7 8 10`,
                output: "36"
            },
            {
                input: `5 32 34 81 23 13 12`,
                output: "183"
            },
        ],
        hiddenTestCases: [
            {
                input: `8 1 2 3 4 5 6 7 8 10`,
                outputReal: "36"
            },
            {
                input: `5 32 34 81 23 13 12`,
                outputReal: "183"
            },
            {
                input: `16 300 1020 281 9196 123930 1872 2343 11228 4329 2985 19283 12884 2938 1921 3838 2183 322334`,
                outputReal: "200531"
            }
        ],
        inputFormat: 'The first number of the input contains a single integer n. The next n space numbers represents the array of n integers. The last integer represents the value of k.',
        outputFormat: 'The output shall be a single boolean value',
        constraintsTime: '0 < n < 10^7, 0 < n < 10^7',
        constraintsSpace: 'O(n)'
    }
]