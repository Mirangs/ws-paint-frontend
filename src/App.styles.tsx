import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    body {
        margin: 0;
    }

    * {
        box-sizing: border-box;

        &::before,
        &::after {
            box-sizing: inherit;
        }
    }

    .App {
        min-height: 100vh;
        background-color: #f6f6f6;
    }
`
