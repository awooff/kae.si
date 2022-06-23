; Let's refresh what you had before <3

(clear)

(resize 1000 1000)


; Now to import the cute image,,

(import "gemini-life-white.png")

(crop 
  (rect 188 38 606 658))


; And finally, our processing!!

(convolve 
  (sharpen .5) 
  (brightness .5))