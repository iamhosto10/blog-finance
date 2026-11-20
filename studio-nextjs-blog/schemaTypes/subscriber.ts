import {defineType} from 'sanity'

export default defineType({
  name: 'subscriber',
  title: 'Suscriptores',
  type: 'document',
  fields: [
    {
      name: 'email',
      title: 'Correo electrónico',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: 'name',
      title: 'Nombre',
      type: 'string',
    },
    {
      name: 'source',
      title: 'Origen principal',
      type: 'string',
      initialValue: 'footer_newsletter',
    },
    {
      name: 'sources',
      title: 'Todos los orígenes',
      type: 'array',
      of: [{type: 'string'}],
    },
    {
      name: 'interest',
      title: 'Producto o interés',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Estado',
      type: 'string',
      options: {
        list: [
          {title: 'Activo', value: 'active'},
          {title: 'Dado de baja', value: 'unsubscribed'},
        ],
        layout: 'radio',
      },
      initialValue: 'active',
    },
    {
      name: 'createdAt',
      title: 'Fecha de registro',
      type: 'datetime',
    },
    {
      name: 'lastSeenAt',
      title: 'Última interacción',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'email',
      subtitle: 'source',
    },
  },
})
