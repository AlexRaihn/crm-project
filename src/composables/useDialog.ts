interface  C extends DefineComponent<any, any, any> { }

import { ref, createVNode, render, type VNode, type DefineComponent, type Component } from 'vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'

// Helper: извлечь тип props из DefineComponent или из класса компонента
type PropsOf<C> =
  C extends DefineComponent<infer P, any, any, any, any, any, any, any> ? P :
  C extends new (...args: any[]) => { $props: infer P } ? P :
  Record<string, unknown>

export const DialogPlugin = () => {
  const container = document.getElementById('modal')
  const dialogVNode = ref<VNode | null>(null)

  function onDialogHide() {
    if (!container) return
    render(null, container)
  }

  /**
   * C — компонент, из которого будет извлечён тип пропсов.
   * props автоматически типизируется как PropsOf<C>.
   */
  function openDialog<C extends Component>(
    modalComponent: C,
    props?: Partial<PropsOf<C>>, // Partial — чтобы не требовать все обязательные props, при желании убирай Partial
    listeners?: Record<string, (...args: any[]) => void>
  ) {
    if (!container) {
      console.warn('[DialogPlugin] container #modal not found')
      return
    }

    const dialogConfig = {
      open: true,
      'onUpdate:open': (val: boolean) => {
        if (!val) onDialogHide()
      },
    }

    // Преобразуем listeners вида { close: fn } -> onClose: fn
    const listenerProps: Record<string, any> = {}
    if (listeners) {
      for (const [k, v] of Object.entries(listeners)) {
        const onKey = 'on' + k.charAt(0).toUpperCase() + k.slice(1)
        listenerProps[onKey] = v
      }
    }

    dialogVNode.value = createVNode(
      Dialog as any,
      { ...(dialogConfig as any) },
      {
        default: () =>
          createVNode(modalComponent as any, {
            ...(props as any),
            ...listenerProps,
          }),
      }
    )

    render(dialogVNode.value, container)
  }

  return {
    openDialog,
    onDialogHide,
  }
}

