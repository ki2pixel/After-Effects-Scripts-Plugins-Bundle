1. Copy the crazy_shapes folder to the following location (the path is fixed, it has nothing to do with the AE installation location, strictly look for it):
Win : C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\
Mac : ~/Library/Application Support/Adobe/CEP/extensions

How does the Mac find this folder?
Open a folder, Shift+Commad+G, go to the folder, enter: ~/resource library, don't drop the tilde and slash in the previous English input method state, it is ~/resource library, not /resource library, this is Two different locations, don’t make a mistake, just continue to look back, and then find the CEP/extensions folder in turn, if not, create it manually

2. For Win, run Add Keys.reg in the folder, and for Mac, unzip and run install-as-admin

3. Open AE, at the top menu position,
Win: Edit - Preferences - General
Mac: After Effects CC - Preferences - General
Check Allow scripts to read, write and access the network
The latest version 2019.1 or later is located at:
Win: Edit - Preferences - Scripts and Expressions
Mac: After Effects CC - Preferences - Scripts and Expressions
Tick ​​Allow writing files and accessing the network

4. In AE, window-extension-Crazy Shapes, you can open the script