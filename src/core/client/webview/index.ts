import * as alt from 'alt-client'
import * as native from 'natives'
import { WebviewEvents } from '@lg-shared/enum/webview-events'

const F2_KEY = 113
let view: alt.WebView
let isFocused = false

export function focusWebView() {
    if (isFocused) {
        view.unfocus()
        view.emit(WebviewEvents.toggleVisibility, false)
        alt.showCursor(false)
        alt.toggleGameControls(true)
        native.triggerScreenblurFadeOut(100)
        isFocused = false
    } else {
        view.focus()
        view.emit(WebviewEvents.toggleVisibility, true)
        alt.showCursor(true)
        alt.toggleGameControls(false)
        native.triggerScreenblurFadeIn(200)
        isFocused = true
    }
}

alt.on('keydown', async (keyCode: number) => {
    if (keyCode !== F2_KEY) {
        return
    }

    if (view) {
        focusWebView()
        return
    }

    view = new alt.WebView('http://assets/webviews/index.html')
    await new Promise((resolve: (...args: any[]) => void) => {
        view.once('load', resolve)
    })

    focusWebView()
})
