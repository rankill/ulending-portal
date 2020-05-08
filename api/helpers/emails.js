const templates = {
  defaultFiles: [],
  'client-request': {
    path: 'static/email/client',
    attachments: [
      't7_logo.jpg',
      't7_ico1.jpg',
      't7_ico2.jpg',
      't7_ico3.jpg',
      't7_ico4.jpg',
      't7_image1.jpg',
      't7_image2.jpg',
      't7_image3.jpg',
      't7_image4.jpg',
      't7_image5.jpg',
      't7_image6.jpg',
      't7_image7.jpg',
      't7_image8.jpg',
      't7_image9.jpg',
      't7_image10.jpg',
      't7_image11.jpg',
      't7_image12.jpg',
      't7_ico_phone.jpg',
      't7_ico_email.jpg',
      't7_ico_facebook.jpg',
      't7_ico_twitter.jpg',
      't7_ico_instagram.jpg',
      't7_ico_linkedin.jpg'
    ],
  },
  'admin-request': {
    path: 'static/email/admin',
    attachments: ['barcode.jpg']
  }
}

module.exports = {
  getAttachmentsByTemplate: function (templateName) {
    return [
      ...templates.defaultFiles,
      ...getAttachments(templateName)
    ]
  },
};


function getAttachments(template) {
  const { attachments, path } = templates[template]
  return attachments.map(image => {
    const [cid] = image.split('.');
    return {
      filename: image,
      path:  `${path}/${image}`,
      cid
    }
  })
}
