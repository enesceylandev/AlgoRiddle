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
    difficulty: string,
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
        difficulty: 'Advanced',
        solution: ['forward','blue-f0','f1','forward','blue-left','f1'],
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
            functions: [{ name: 'f0', args: 5 }, { name: 'f1', args: 0 }, { name: 'f2', args: 0 }]
        },
        player: {
            spawn: [10, 3],
            direction: 'down'
        },
        difficulty: 'Advanced',
        solution: ['forward', 'blue-right', 'blue-forward', 'left', 'f0'],
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
                color: 'blue',
                required: true
            }

        ]
    },
    {
        ruleset: {
            control: [ 'left', 'forward', 'right'],
            color: ['red', 'purple', 'blue'],
            functions: [{ name: 'f0', args: 6 }, { name: 'f1', args: 0 }, { name: 'f2', args: 0 }]
        },
        player: {
            spawn: [1, 10],
            direction: 'right'
        },
        difficulty: 'Expert',
        solution: ["forward","blue-f0","forward","left","forward","right"],
        board: [
            {
                cord: [1, 10],
                color: 'blue'
            },
            {
                cord: [2, 10],
                color: 'blue',
            },
            {
                cord: [3, 10],
                color: 'blue'
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
                color: 'blue',
            },
            {
                cord: [8, 10],
                color: 'blue'
            },
            {
                cord: [9, 10],
                color: 'purple',
                required: true
            },
            {
                cord: [10, 10],
                color: 'blue'
            },
            {
                cord: [10, 9],
                color: 'blue'
            },            {
                cord: [11, 9],
                color: 'blue'
            },
            {
                cord: [11, 8],
                color: 'blue'
            },            {
                cord: [12, 8],
                color: 'blue'
            },
            {
                cord: [12, 7],
                color: 'blue'
            },            {
                cord: [13, 7],
                color: 'blue'
            },
            {
                cord: [13, 6],
                color: 'blue'
            },            {
                cord: [14, 6],
                color: 'blue'
            },
            {
                cord: [14, 5],
                color: 'blue',
                required: true
            }
        ]
    },
    {
      ruleset: {
        control: [ 'left', 'forward', 'right'],
        color: ['red', 'purple', 'blue'],
        functions: [{ name: 'f0',  args: 6},{ name: 'f1',  args: 3},{ name: 'f2', args: 0}
        ]
      },
      difficulty: 'Specialist',
      solution: ['forward', 'blue-left', 'blue-forward', 'red-right', 'red-f0', 'f1', 'left', 'left', 'f0'],
      player: {
        spawn: [8,11],
        direction: "up"
      },
      board: [
        {
          cord: [7,11],
          color: "red"
        },        
        {          
          cord: [6,11],
          color: "red"
        },        
        {          
          cord: [8,11],
          color: "red"
        },        
        {          
          cord: [9
            ,11
          ],
          color: "red"
        },        
        {          
          cord: [6,10],
          color: "red"
        },        
        {          
          cord: [7,10],
          color: "red"
        },        
        {          
          cord: [9,10],
          color: "red"
        },        
        {          
          cord: [10,11],
          color: "red"
        },        
        {          
          cord: [10,10],
          color: "red"
        },        
        {          
          cord: [6,9],
          color: "red"
        },        
        {          
          cord: [5,9],
          color: "red"
        },        
        {          
          cord: [5,8],
          color: "red"
        },        
        {          
          cord: [4,8],
          color: "red"
        },        
        {          
          cord: [3,8],
          color: "red"
        },        
        {          
          cord: [4,7],
          color: "red"
        },        
        {          
          cord: [3,7],
          color: "red"
        },        
        {          
          cord: [3,6],
          color: "red"
        },        
        {          
          cord: [3,5],
          color: "red"
        },        
        {          
          cord: [3,4],
          color: "red"
        },        
        {          
          cord: [4,4],
          color: "red"
        },        
        {          
          cord: [4,3],
          color: "red"
        },        
        {          
          cord: [5,3],
          color: "red"
        },        
        {          
          cord: [6,3],
          color: "red"
        },        
        {          
          cord: [10,9],
          color: "red"
        },        
        {          
          cord: [11,9],
          color: "red"
        },        
        {          
          cord: [11,8],
          color: "red"
        },        
        {          
          cord: [12,8],
          color: "red"
        },        
        {          
          cord: [13,8],
          color: "red"
        },        
        {          
          cord: [13,7],
          color: "red"
        },        
        {          
          cord: [12,7],
          color: "red"
        },        
        {          
          cord: [13,6],
          color: "red"
        },        
        {          
          cord: [13,5],
          color: "red"
        },        
        {          
          cord: [13,4],
          color: "red"
        },        
        {          
          cord: [12,4],
          color: "red"
        },        
        {          
          cord: [12,3],
          color: "red"
        },        
        {          
          cord: [11,3],
          color: "red"
        },        
        {          
          cord: [10,3],
          color: "red"
        },        
        {          
          cord: [9,3],
          color: "red"
        },        
        {          
          cord: [8,3],
          color: "red"
        },        
        {          
          cord: [7,3],
          color: "red"
        },        
        {          
          cord: [7,4],
          color: "red"
        },        
        {          
          cord: [8,4],
          color: "red"
        },        
        {          
          cord: [9,4],
          color: "red"
        },        
        {          
          cord: [8,5],
          color: "red"
        },        
        {          
          cord: [8,10],
          color: "blue",
          required: true
        },
        {
          cord: [7,9],
          color: "blue",
          required: true
        },
        {
          cord: [6,8],
          color: "blue",
          required: true
        },
        {
          cord: [5,7],
          color: "blue",
          required: true
        },
        {
          cord: [4,6],
          color: "blue",
          required: true
        },
        {
          cord: [4,5],
          color: "blue",
          required: true
        },
        {
          cord: [5,4],
          color: "blue",
          required: true
        },
        {
          cord: [6,4],
          color: "blue",
          required: true
        },
        {
          cord: [7,5],
          color: "blue",
          required: true
        },
        {
          cord: [9,5],
          color: "blue",
          required: true
        },
        {
          cord: [10,4],
          color: "blue",
          required: true
        },
        {
          cord: [11,4],
          color: "blue",
          required: true
        },
        {
          cord: [12,5],
          color: "blue",
          required: true
        },
        {
          cord: [12,6],
          color: "blue",
          required: true
        },
        {
          cord: [11,7],
          color: "blue",
          required: true
        },
        {
          cord: [10,8],
          color: "blue",
          required: true
        },
        {
          cord: [9,9],
          color: "blue",
          required: true
        },
        {
          cord: [8,6],
          color: "purple",
          required: true
        }
      ]
    }
]

