export default (Quill) => {
  const Parchment = Quill.import('parchment')

  const FontStyle = new Parchment.Attributor.Style('size', 'font-size', { scope: Parchment.Scope.INLINE })
  const FontFamilyStyle = new Parchment.Attributor.Style('font', 'font-family', { scope: Parchment.Scope.INLINE })

  Quill.register(FontStyle, true)
  Quill.register(FontFamilyStyle, true)

}
