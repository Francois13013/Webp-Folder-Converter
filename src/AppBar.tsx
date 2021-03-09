import React from 'react';
import Typography from '@material-ui/core/Typography';

export default function ButtonAppBar() {
  return (
              <div id="title-bar">
                <Typography variant="h6" id="title">
                  Folder Webp Converter
                </Typography>
                <div id="title-bar-btns">
                  <button id="minBtn">-</button>
                  <button id="closeBtn">x</button>
                </div>
              </div>
  );
}