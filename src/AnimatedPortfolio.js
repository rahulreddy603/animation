import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedPortfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [projects, setProjects] = useState([
    { 
      id: 1, 
      title: 'Creative Design', 
      description: 'Innovative UI/UX design project',
      image: '/api/placeholder/400/300'
    },
    { 
      id: 2, 
      title: 'Web Development', 
      description: 'Full-stack application with modern technologies',
      image: '/api/placeholder/400/300'
    },
    { 
      id: 3, 
      title: 'Mobile App', 
      description: 'Cross-platform mobile application',
      image: '/api/placeholder/400/300'
    }
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const renderSection = () => {
    switch(activeSection) {
      case 'home':
        return (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center p-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white"
          >
            <motion.h1 
              whileHover={{ scale: 1.1 }}
              className="text-5xl font-bold mb-4"
            >
              Creative Portfolio
            </motion.h1>
            <p className="text-xl mb-6">
              Innovative Design & Development Solutions
            </p>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="bg-white text-purple-600 px-6 py-3 rounded-full"
            >
              Explore Work
            </motion.button>
          </motion.div>
        );
      
      case 'projects':
        return (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6 p-6"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p>{project.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        );
      
      case 'contact':
        return (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
          >
            <h2 className="text-3xl mb-6 text-center">Contact Me</h2>
            <form>
              <motion.input
                whileFocus={{ scale: 1.02 }}
                placeholder="Name"
                className="w-full p-3 mb-4 border rounded"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                placeholder="Email"
                className="w-full p-3 mb-4 border rounded"
              />
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                placeholder="Message"
                className="w-full p-3 mb-4 border rounded h-32"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-full bg-purple-600 text-white p-3 rounded"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white shadow-md p-4"
      >
        <div className="container mx-auto flex justify-center space-x-6">
          {['home', 'projects', 'contact'].map((section) => (
            <motion.button
              key={section}
              onClick={() => setActiveSection(section)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`capitalize ${
                activeSection === section 
                  ? 'text-purple-600 font-bold' 
                  : 'text-gray-600'
              }`}
            >
              {section}
            </motion.button>
          ))}
        </div>
      </motion.nav>

      {/* Animated Content Area */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>

      {/* Floating Background Elements */}
      {[1, 2, 3].map((item) => (
        <motion.div
          key={item}
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: [0, 20, -20, 0],
            opacity: [0, 1, 1, 0],
            transition: {
              duration: 5,
              repeat: Infinity,
              delay: item * 0.5
            }
          }}
          className={`fixed w-16 h-16 rounded-full ${
            item === 1 ? 'bg-pink-400' : 
            item === 2 ? 'bg-blue-400' : 
            'bg-green-400'
          } opacity-20`}
          style={{
            top: `${20 + item * 30}%`,
            left: `${10 + item * 20}%`
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedPortfolio;