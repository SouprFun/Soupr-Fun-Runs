import React from 'react';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p >
          As a runner that started running more than a decade ago, one of the things that I wanted was a running tracker. 
          I would often run on a track or tredmill, instead of outside, so a GPS app wouldn't necessarily help. 
          So I decided for my solo project to make a run tracker to help visualize growth and keep track of runs/records. 
          This project has been created in about 2 weeks, 
          and is (in it's current form) not a *complete and polished product* but a work in progress.
        </p>
      </div>
    </div>
  );
}

export default AboutPage;
