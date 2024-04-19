/* @refresh reload */
import { render } from 'solid-js/web'
import AppView from './app'
import './assets/styles/styles.css'
import routes from './router'

const main = async () => {
    const container = document.getElementById('app')!

    render(() => <AppView routes={routes}/>, container)
}

main()
