import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export function DynamicForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log('Form submitted:', formData);
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/30066066/pexels-photo-30066066.jpeg)'
        }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Form Container */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl" />
        
        <form 
          onSubmit={handleSubmit}
          className="relative bg-transparent p-8 rounded-2xl border border-white/20
            transform transition-all duration-300"
        >
          <h2 className="text-3xl font-bold text-white mb-6 text-center">Get in Touch</h2>
          
          <div className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                  text-white placeholder-white/40 focus:outline-none focus:ring-2 
                  focus:ring-white/30 transition-all duration-200"
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                  text-white placeholder-white/40 focus:outline-none focus:ring-2 
                  focus:ring-white/30 transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Message Input */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                  text-white placeholder-white/40 focus:outline-none focus:ring-2 
                  focus:ring-white/30 transition-all duration-200 h-32 resize-none"
                placeholder="Enter your message"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-white/20 hover:bg-white/30 text-white 
                font-medium rounded-lg transition-all duration-200 transform 
                hover:scale-[1.02] active:scale-[0.98] focus:outline-none 
                focus:ring-2 focus:ring-white/30 flex items-center justify-center gap-2"
            >
              <span>Send Message</span>
              <Send size={18} className="transform -rotate-45" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}