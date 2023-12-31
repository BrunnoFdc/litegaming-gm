import * as alt from 'alt-client'
import * as NativeUI from '@nativeui'
import { EventosClient } from '@lg-shared/enum/id-eventos'
import { spawnCarrosItem } from './spawn-carros-menu'
import { bindItems } from '@lg-client/menu/menu'

const menu = new NativeUI.Menu('Staff Menu', 'Menu do Staffer', new NativeUI.Point(50, 50))

bindItems(menu, spawnCarrosItem())

alt.onServer(EventosClient.MENU_STAFF, () => {
    alt.setTimeout(() => menu.Open(), 500)
})
