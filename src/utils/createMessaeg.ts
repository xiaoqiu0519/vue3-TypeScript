import { createApp } from 'vue';
import Message from '@/components/message/message.vue'
type messageType = 'success' | 'error' | 'default' 
export const createMessage = (message:string,type:messageType,timeout=2000):void=>{
  const messageMount = createApp(Message,{
    message,
    type,
  })
  const MessageNode = document.createElement('div')
  document.body.appendChild(MessageNode)
  messageMount.mount(MessageNode)
  setTimeout(()=>{
    messageMount.unmount()
    MessageNode && document.body.removeChild(MessageNode)
  },timeout)
}
