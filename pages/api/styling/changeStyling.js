const fs = require('fs');


export default function (req, res) {
  try {
    let obj = req.body.doPush
    const text_color = '$color1: '+obj.$color1+';'+'\n'+'$color2: '+obj.$color2+';'+'\n'+'$color3: '+obj.$color3+';'+'\n'+'$color4: '+obj.$color4+';'+'\n'+'$color5: '+obj.$color5+';'+'\n'+'$color6: '+obj.$color6+';'

    fs.writeFile(`./pages/control.scss`, (text_color), function (err) {
        if (err) {
            console.error(err);
        }
    })

    res.status(201)
    res.json({})
  }
  catch(e) {
    res.status(500)
    res.json({error: 'Failure to work with the Database'})
  }
}
