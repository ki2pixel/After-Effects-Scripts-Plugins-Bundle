1. Copy the KBar-3.1.1 folder to the following location:
Win : C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\
Mac : /Library/Application Support/Adobe/CEP/extensions

What if the MAC quickly finds this folder?
Open the folder, Shift+Commad+G, go to the folder, enter: /resource library, do not drop the English slash in front, it is / resource library, not ~/resource library, these are two different locations, Don’t make a mistake, just press Enter and search backwards one by one. If there is no CEP folder, create it manually one by one.

2. For Win, run Add Keys.reg in the folder, and for Mac, unzip and run install-as-admin

3. In AE:
Win: Edit - Preferences - General
Mac: After Effects CC - Preferences - General
Check Allow scripts to read, write and access the network

The latest version 2019.1 or later is located at:
Win: Edit - Preferences - Scripts and Expressions
Mac: After Effects CC - Preferences - Scripts and Expressions
Tick ​​Allow writing files and accessing the network

5. Restart AE, in the top menu, window-extension-Kbar 3, you can open the script