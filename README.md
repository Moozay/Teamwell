# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).



# Team well

a simple and responsive Vue.js application that displays a list of employees.Using Vue, Tailwind CSS for styling and Vite as the build tool.



## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  yarn install
```

Add env file and variables
```
- create env file in the root of the project and add backend_endpoints and bearer_token
```

```bash
  yarn install
```

Start the server

```bash
  yarn dev
```


## Approach

- Used vue-query to handle API request
- Used Directus sdk to create API get request
-  used a function using moment to convert date YYYY-MM-DD to D MMMM YYYY (fr)


## Assumptions
- Used the first position of the employee and displayed it, assuming  the highest position is first

## Later Improvements
- add pagination which will also help loading time.
- optimise the date  conversion function
- make app more responsive
 

## Tech Stack

**Client:** VUE 3, Vue-query, TailwindCSS

**Server:** Directus


