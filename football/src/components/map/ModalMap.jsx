import React from 'react'
import {Map} from './styled'

export default function ModalMap() {
  return (
    <Map>
      <h1>Sân Trưng Vương</h1>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.3555004638883!2d108.20827141468385!3d16.047031688894684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219bee68e5add%3A0xe5e9b113bc37fd33!2zU8OibiBiw7NuZyDEkcOhIFRyxrBuZyBWxrDGoW5nIC0gQks4!5e0!3m2!1svi!2s!4v1669620738812!5m2!1svi!2s" width={800} height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
    </Map>
  )
}
