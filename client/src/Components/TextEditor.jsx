import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Quill from 'quill'
import "quill/dist/quill.snow.css"

import { io } from "socket.io-client"


const SAVE_INTERVAL_MS = 2000
const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    ["image", "blockquote", "code-block"],
    ["clean"],
]

const TextEditor = () => {
    const { id: documentId } = useParams()
    const [socket, setSocket] = useState()
    const [quill, setQuill] = useState()

    useEffect(() => {  //make connection at the first render
        const s = io(`${import.meta.env.VITE_BACKEND_URL}`)
        setSocket(s);

        return () => {
            s.disconnect()
        }
    }, [])

    useEffect(() => {   //send the id to server to join a room & get the document data
        if(!socket || !quill) return
        socket.once('load-document', document => {
            quill.setContents(document)
            quill.enable()
        })

        socket.emit('get-document',documentId)

    }, [socket, quill, documentId])

    useEffect(() => {   //send changes of documnet to server
        if (!socket || !quill) return
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return
            socket.emit('send-changes', delta)
        }
        quill.on('text-change', handler)

        return () => {
            quill.off('text-change', handler)
        }
    }, [quill, socket])

    useEffect(() => {   //receive changes of document from server
        if (!socket || !quill) return
        const handler = (delta) => {
            quill.updateContents(delta)
        }
        socket.on('receive-changes', handler)

        return () => {
            socket.off('receive-changes', handler)
        }
    }, [socket, quill])

    useEffect(()=> {   // save document after every 2 seconds
        if(!socket || !quill) return

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents()) 

            return () => {
                clearInterval(interval)
            }
        }, SAVE_INTERVAL_MS);

    }, [socket, quill])

    const wrapperRef = useCallback((wrapper) => {   //setup Quill when render at first
        if (!wrapper) return;

        wrapper.innerHTML = "";
        const editor = document.createElement('div');
        wrapper.append(editor);
        const q = new Quill(editor, {
            theme: 'snow',
            modules: {
                toolbar: TOOLBAR_OPTIONS,
            }
        })

        q.disable()
        q.setText("Loading...")
        setQuill(q);

    }, [])


    return (
        <div className='container' ref={wrapperRef} >

        </div>
    )
}

export default TextEditor
