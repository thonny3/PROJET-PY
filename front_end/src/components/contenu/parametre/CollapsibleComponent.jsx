import React, { useState } from 'react';


const CollapsibleComponent = () => {

  return (
    <div class="container mt-3">
  <h2>Simple Collapsible</h2>
  <p>Click on the button to toggle between showing and hiding content.</p>
  <button type="button" class="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#demo">Simple collapsible</button>
  <div id="demo" class="collapse">
  
  </div>
</div>
  )
};

export default CollapsibleComponent;
