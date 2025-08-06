import {defineType} from 'sanity'

export default defineType({
  name: 'dolar',
  title: 'Valor del dólar',
  type: 'document',
  fields: [
    {
      name: 'valor',
      title: 'Valor en COP',
      type: 'number',
    },
    {
      name: 'fecha',
      title: 'Fecha de actualización',
      type: 'datetime',
    },
  ],
})
