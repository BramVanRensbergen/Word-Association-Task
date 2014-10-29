Word Association Task
=========================

Author of this version: Bram Van Rensbergen (mail@bramvanrensbergen.com) 

Source: https://github.com/BramVanRensbergen/Word-Association-Task


A small web-based word association task. Participants give up to three associations to a number of cue words. 


The experiment was created for personal use (ongoing research), but anyone may use it if they like.

* Participants see a word, and are asked to respond with whatever comes to mind upon seeing it.
* The experiment requires javascript on the user's side, and php on serverside (php is used only to write out the results; it should be trivial to change this to some other method/language)
* Cue words are defined in 'input/cues.js'. You can define any amount of cues here, randomize them per user, ... .
* Output is written to the 'output' folder, with one file for each participant. Make sure the experiment has write access to this folder!
* Experiment logic is defined in core/js/associations.js
* Instructions etc. are in Dutch, but code and comments are in English. To translate, change the files in core/content, and edit a couple of error messages in core/js/associations.js

