# Typescript setup environment for Auth.JS

The typescript files, e.g., CST.ts, main.ts, are compiled to javascript files.

# Requirements

nodemon (optional): automatically run a javascript file when it changes

    npm install -g nodemon


# Workflow

- Write your typescript files, e.g., `CST.ts`
- Include the typescript file in the `tsconfig.json`
- Run typescript compiler `tsc -w`. The `-w` flag watches for any changes in the typescript files and will recompile the typescript files automatically.
- Run `nodemon main.js` to execute the compiled javascript code. It will watches for any change in the javascript file and re-run the javascript file.

Note: If you don't use nodemon, you'll have to manually run the `main.js` file after compiling using `node main.js`

# Example: 

See the `main.ts` file. It simply creates a new `CST_MSG` variable and print its value to the console.

# Demo 

## Video: http://cl.ly/1G3R3A2X271u

## Description: 

- Left panel: `main.ts` code
- Top right panel: run typescript compiler `tsc`
- Bottom right panel: run code for `main.js` after compiling.
