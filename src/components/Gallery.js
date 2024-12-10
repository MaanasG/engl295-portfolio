import React, { useRef, useState, useEffect } from 'react';

// Mock blog post data - you'll want to replace this with actual content
const blogPosts = {
  'AAending.png': {
    title: 'Welcome To My ENGL295 Portfolio!',
    content: `This website is a culmination of my projects and work throughout ENGL295 - 
    Introduction to Digital Storytelling and Poetics. 

    My work throughout the year manipulates and remixes various texts discussed throughout 
    the semester. Having used tools such as React.js and ChatGPT API in previous CS projects, 
    I decided to apply my UI/UX skills to develop websites and blogs to supplement the interpretations
    I came up with for each project. 

    I hope you enjoy my work!`,
    date: 'December 10th, 2024'
  },

  'codepen.png': {
    title: 'Tech Mini Presentation - CodePen',
    content: `This presentation is a quick rundown of the popular front-end social development site, CodePen.

    Tasked with showcasing the digital storytelling capabilities of this site, we gathered data and examples of 
    developers using CodePen to create digital art and work. We quickly learned that this site was geared towards 
    developers with strong foundations in front-end development, specifically in languages such as HTML, CSS, SCSS,
    JS, and more.

    This presentation was made in Google Slides.`,
    date: 'October 30th, 2024'
  },

  'geryonfruitbowl.png': {
    title: 'Hypertext Assignment - Fruit Bowl',
    content: `This website reimagines Chapter XII, of Anne Carson's Autobiography of Red, 
    Fruit Bowl.

    This project plays on the main character Geryon's deliberation over having no purpose in life,
    and how the fruit bowl serves as an analogy for this feeling. 
    
    The website itself is broken into several segments of stanzas, each typed in a certain color
    over a background to reflect the theme or tone of each section. Each of these segments
    are accomponied by an illustration that represents the section. This project also makes use 
    of various hyperlinks to illustrate key themes in the text; each of these hyperlinks connect to a modern
    reference, that place the story in a modern setting. All together, these elements create a textually
    and visually creative interpretation of this Greek mythology retelling.

    This website was built using React.js, and several of the images were generated using DALL-E 3 AI.
    
    Access here: https://geryon-fruitbowl-app-b2fk.vercel.app/`,
    date: 'October 2nd, 2024'
  },

  'poeticdata.png': {
    title: 'Poetic Data Project - CS Majors, Job Market, AI',
    content: `This project simulates the life of an undergraduate computer science student, and
    builds a narrative around the interests of the user using AI.

    The base idea of this project was to create a form, consisting of various questions that represent
    decisions that comptuer science majors make as a job applicant, student, and perso n as a whole. Based on
    the answers of the user, our form returned a score representing their career, be it as a successful software
    engineer, tech startup founder, or major switcher. However, we felt this would have been rather straightforward;
    to add some depth to the questions, we created question templates and used ChatGPT's API to fill in the content
    based on the given interests from the user; tailoring these questions created a much more engaging storyline.

    Our idea was based primarily on 3 coinciding pieces of data that our group found: increasing computer science degree
    seeking students, increased usage of AI, and declining CS major job conversion. As CS students ourselves,
    we felt that this topic was very relevant, but the numbers expressed very little of the full story. There are several
    factors and decisions that go into a student's success, and success is defined in a variety of different ways, not just
    through getting a good CS internship or job. For this reason, we sprinkled several graphs, quotes, and pictures into
    our quiz to show how multifaceted this discipline is.

    This project was built with React.js, and uses ChatGPT's API for content generation. `,
    date: 'November 13th, 2024'
  },

  'visa.png': {
    title: 'Remix Project - VISA',
    content: `This project visualizes and interpret Solmaz Sharif's poem, Visa.

    Visa describes the immigration process of a foreign narrator, who’s waiting to be received by someone on the 
    other side of customs in an airport. The poem itself describes the anxiety involved in the process of 
    getting into such a country, as well as the overarching prejudice and fear that is directed towards foreigners 
    upon entry to their country. This manifests in descriptions of the coldness of the officers, as well as the airport as a whole.

    My text organization idea was mainly based on other poem and story-based line-by-line explanation sites, 
    which break up texts into several sections, each revealing a description of the text above. Similarly, 
    I chose to break up and analyze each stanza of the project one by one, and wrote contrary perspective—be it
    from a TSA agent, onlooker, or police officer—that offer the same level of negativity and prejudice as the author.
    The site also includes various images of airport security news or breaches, representing the content of each stanza.


    This project was built with React.js and TailwindCSS.
    
    Access here: https://maanasg.github.io/engl-remix-project/`,
    date: 'November 24th, 2024'
  },


  // Add more blog post entries for other images
};

function importAll(r) {
  return r.keys().map(item => item.replace('./', ''));
}

const imageFileNames = importAll(require.context('./imgs', false, /\.(png|jpe?g|svg)$/));

const Gallery = () => {
  const trackRef = useRef(null);
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const track = trackRef.current;
  
    const handleStart = (e) => {
      // Prevent default to stop unwanted scrolling
      e.preventDefault();
      
      // Support both mouse and touch events
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      setMouseDownAt(clientX);
    };
  
    const handleEnd = (e) => {
      // Prevent default to stop unwanted scrolling
      e.preventDefault();
      
      setMouseDownAt(0);
      setPrevPercentage(percentage);
    };
  
    const handleMove = (e) => {
      // Prevent default to stop unwanted scrolling
      e.preventDefault();
      
      // Support both mouse and touch events
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      
      if (mouseDownAt === 0) return;
    
      const mouseDelta = mouseDownAt - clientX;
      const maxDelta = window.innerWidth / 2;
      const newPercentage = (mouseDelta / maxDelta) * -100;
    
      const imageWidth = track.querySelector('.image').offsetWidth;
      const maxNegativePercentage = -((imageFileNames.length - 1) * (imageWidth + 32));
      const nextPercentage = Math.max(
        Math.min(prevPercentage + newPercentage, 0), 
        maxNegativePercentage
      );
    
      setPercentage(nextPercentage);
      
      // Use requestAnimationFrame for smoother animations
      requestAnimationFrame(() => {
        track.animate(
          { transform: `translate(${nextPercentage}%, -50%)` },
          { duration: 1200, fill: "forwards" }
        );
      
        for (const image of track.getElementsByClassName("image")) {
          image.animate(
            { objectPosition: `${-nextPercentage * .2}% 50%` },
            { duration: 1200, fill: "forwards" }
          );
        }
      });
    };
  
    // Attach listeners to window for full-screen dragging
    window.addEventListener('mousedown', handleStart);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('mousemove', handleMove);
  
    // Touch events
    window.addEventListener('touchstart', handleStart, { passive: false });
    window.addEventListener('touchend', handleEnd, { passive: false });
    window.addEventListener('touchcancel', handleEnd, { passive: false });
    window.addEventListener('touchmove', handleMove, { passive: false });
  
    return () => {
      // Remove all event listeners
      window.removeEventListener('mousedown', handleStart);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchstart', handleStart);
      window.removeEventListener('touchend', handleEnd);
      window.removeEventListener('touchcancel', handleEnd);
      window.removeEventListener('touchmove', handleMove);
    };
  }, [mouseDownAt, prevPercentage, percentage, imageFileNames.length]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const galleryComplete = imageFileNames.map((image, index) => (
    <GalleryImage 
      key={index} 
      image={image} 
      onClick={() => handleImageClick(image)}
    />
  ));

  return (
    <div className="relative h-screen w-screen bg-black">
      
      {/* Pulsing scroll hint */}
      <div 
        className="absolute top-8 left-1/2 transform -translate-x-1/2 
                   text-gray-500 opacity-50 
                   animate-pulse animate-infinite animate-duration-[2000ms]
                   z-10 pointer-events-none"
      >
        Swipe to scroll →
      </div>
      
      <div 
        id="image-track" 
        ref={trackRef} 
        className="absolute left-1/2 top-1/2 flex gap-8 transform translate-x-[-50%] translate-y-[-50%]"
      >
        {galleryComplete}
      </div>

      {selectedImage && (
        <BlogPostModal 
          image={selectedImage}
          post={blogPosts[selectedImage] || {
            title: 'No Post Available',
            content: 'There is no blog post for this image.',
            date: 'Unknown'
          }}
          onClose={closeModal} 
        />
      )}
    </div>
  );
};

const GalleryImage = ({ image, onClick }) => (
  <img 
    className="image w-64 md:w-80 lg:w-96 h-[75vmin] object-cover object-right-top rounded-lg 
               transition-all duration-300 ease-in-out 
               hover:scale-95 
               hover:shadow-xl
               cursor-pointer"
    src={require(`./imgs/${image}`)} 
    alt="" 
    draggable="false"
    onClick={onClick}
  />
);

const BlogPostModal = ({ image, post, onClose }) => (
  <div 
    className="fixed inset-0 z-50 bg-black bg-opacity-90 overflow-y-auto 
               flex justify-center items-center p-4
               animate-fade-in animate-duration-300"
    onClick={onClose}
  >
    <div 
      className="bg-neutral-900 text-white max-w-4xl w-full rounded-lg p-8 
                 relative max-h-[90vh] overflow-y-auto
                 animate-slide-down animate-duration-500 animate-ease-out"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 text-2xl hover:text-gray-300"
      >
        ×
      </button>

      <div className="flex mb-6">
        <img 
          src={require(`./imgs/${image}`)} 
          alt="Post Header" 
          className="w-1/3 h-auto object-cover rounded-lg mr-6"
        />
        <div>
          <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
          <p className="text-gray-400">{post.date}</p>
        </div>
      </div>

      <div className="prose prose-invert">
        {post.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-4">{paragraph}</p>
        ))}
      </div>
    </div>
  </div>
);

export default Gallery;