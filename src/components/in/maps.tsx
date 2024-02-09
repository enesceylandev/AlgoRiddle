export type Map = {
    ruleset: {
        control: string[],
        color: string[],
        functions: { name: string; args: number }[];
    },
    player: {
        spawn: number[],
        direction: string,
    },
    solution: string[],
    board: {
        cord: number[],
        color: string,
        required?: true
    }[]
}

export const playground: Map[] = [
    {
        ruleset: {
            control: [ 'left', 'forward', 'right'],
            color: ['red', 'purple', 'blue'],
            functions: [{ name: 'f0', args: 3 }, { name: 'f1', args: 3 }, { name: 'f2', args: 0 }]
        },
        player: {
            spawn: [2, 8],
            direction: 'right'
        },
        solution: ["forward","blue-f0","f1","forward","blue-left","f1"],
        board: [
            {
                cord: [2, 8],
                color: 'blue'
            },
            {
                cord: [3, 8],
                color: 'blue'
            },
            {
                cord: [4, 8],
                color: 'blue'
            },
            {
                cord: [5, 8],
                color: 'blue',
                required: true
            },
            {
                cord: [6, 8],
                color: 'blue'
            },
            {
                cord: [7, 8],
                color: 'blue'
            },
            {
                cord: [8, 8],
                color: 'blue'
            },
            {
                cord: [9, 8],
                color: 'purple'
            },
            {
                cord: [10, 8],
                color: 'purple',
                required: true
            },
            {
                cord: [11, 8],
                color: 'purple'
            },
            {
                cord: [12, 8],
                color: 'blue'
            },
            {
                cord: [12, 7],
                color: 'blue',
                required: true
            }
        ]
    },
    {
        ruleset: {
            control: [ 'left', 'forward', 'right'],
            color: ['red', 'purple', 'blue'],
            functions: [{ name: 'f0', args: 5 }]
        },
        player: {
            spawn: [10, 3],
            direction: 'down'
        },
        solution: [],
        board: [
            {
                cord: [10, 3],
                color: 'blue'
            },
            {
                cord: [10, 4],
                color: 'blue'
            },
            {
                cord: [9, 4],
                color: 'blue'
            },
            {
                cord: [9, 5],
                color: 'blue'
            },
            {
                cord: [8, 5],
                color: 'blue'
            },
            {
                cord: [8, 6],
                color: 'blue'
            },
            {
                cord: [7, 6],
                color: 'blue'
            },
            {
                cord: [7, 7],
                color: 'blue'
            },
            {
                cord: [6, 7],
                color: 'blue'
            },
            {
                cord: [6, 8],
                color: 'blue'
            },
            {
                cord: [5, 8],
                color: 'purple'
            },
            {
                cord: [5, 9],
                color: 'purple'
            },
            {
                cord: [6, 9],
                color: 'blue'
            },
            {
                cord: [6, 10],
                color: 'blue'
            },
            {
                cord: [7, 10],
                color: 'blue'
            },
            {
                cord: [7, 11],
                color: 'blue'
            },
            {
                cord: [8, 11],
                color: 'blue'
            },
            {
                cord: [8, 12],
                color: 'blue'
            },
            {
                cord: [9, 12],
                color: 'blue'
            },
            {
                cord: [9, 13],
                color: 'blue'
            },
            {
                cord: [10, 13],
                color: 'blue'
            },
            {
                cord: [10, 14],
                color: 'blue'
            }

        ]
    },
    {
        ruleset: {
            control: [ 'left', 'forward', 'right'],
            color: ['red', 'purple', 'blue'],
            functions: [{ name: 'f0', args: 6 }]
        },
        player: {
            spawn: [2, 10],
            direction: 'right'
        },
        solution: [],
        board: [
            {
                cord: [2, 10],
                color: 'blue'
            },
            {
                cord: [3, 10],
                color: 'blue',
                required: true
            },
            {
                cord: [4, 10],
                color: 'blue'
            },
            {
                cord: [5, 10],
                color: 'blue'
            },
            {
                cord: [6, 10],
                color: 'blue'
            },
            {
                cord: [7, 10],
                color: 'blue'
            },
            {
                cord: [8, 10],
                color: 'blue',
                required: true
            },
            {
                cord: [9, 10],
                color: 'blue'
            },
            {
                cord: [10, 10],
                color: 'purple'
            },
            {
                cord: [11, 10],
                color: 'blue'
            },
            {
                cord: [11, 9],
                color: 'blue'
            },            {
                cord: [12, 9],
                color: 'blue'
            },
            {
                cord: [12, 8],
                color: 'blue'
            },            {
                cord: [13, 8],
                color: 'blue'
            },
            {
                cord: [13, 7],
                color: 'blue'
            },            {
                cord: [14, 7],
                color: 'blue'
            },
            {
                cord: [14, 6],
                color: 'blue'
            },            {
                cord: [15, 6],
                color: 'blue'
            },
            {
                cord: [15, 5],
                color: 'blue'
            }
        ]
    },
    {
        ruleset: {
            control: [ 'left', 'forward', 'right'],
            color: ['red', 'purple', 'blue'],
            functions: [{ name: 'f0', args: 5 }, { name: 'f1', args: 7 }]
        },
        player: {
            spawn: [4, 5],
            direction: 'right'
        },
        solution: [],
        board: [
            {
                cord: [4, 5],
                color: 'blue'
            },
            {
                cord: [5, 5],
                color: 'blue',
                required: true
            },
            {
                cord: [6, 5],
                color: 'purple'
            },
            {
                cord: [7, 5],
                color: 'purple'
            },
            {
                cord: [8, 5],
                color: 'blue'
            },
            {
                cord: [9, 5],
                color: 'purple'
            },
            {
                cord: [10, 5],
                color: 'purple',
                required: true
            },
            {
                cord: [10, 6],
                color: 'red'
            },
            {
                cord: [10, 7],
                color: 'red'
            }
        ]
    }
]

