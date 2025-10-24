import { createVNode, render, DefineComponent, ref } from 'vue'
import Dialog from '@/components/ui/dialog/Dialog.vue'

interface  C extends DefineComponent<any, any, any> { }

export const DialogPlugin = () => {
    const container = document.getElementById('modal')

    const component = ref<C  | null>(null)

    const dialogConfig = {
        open: true,
        'onUpdate:open': (val: boolean) => {
            if (!val) onDialogHide()
          }
    }

    const dialogVNode = ref<ReturnType<typeof createVNode> | null>(null)

    function onDialogHide() {
        render(null, container)
    }

    function openDialog(
        modalComponent: C,
        props: InstanceType<C>['$props'] = {} as InstanceType<C>['$props']
      ) {
        component.value = modalComponent,
        component.value.$props = props
        
        
        dialogVNode.value = createVNode(Dialog, {...dialogConfig}, {
            default: () =>
              createVNode(component.value, {
                ...(props as any),
              }),
          })

        render(dialogVNode.value, container)
    }

    return {
        openDialog,
        onDialogHide,
    }
}
