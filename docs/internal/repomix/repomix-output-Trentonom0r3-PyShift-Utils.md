This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where comments have been removed, security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
PSCAE/
  CoreLib/
    App.cpp
    App.h
    ItemManager.cpp
    ItemManager.h
    Project.cpp
    Project.h
    PyCore.cpp
    PyCore.h
  App.cpp
  App.h
  framework.h
  ItemManager.cpp
  ItemManager.h
  LICENSE
  MessageQueue.cpp
  MessageQueue.h
  pch.cpp
  pch.h
  Project.cpp
  Project.h
  PSCAE.vcxproj
  PSCAE.vcxproj.filters
  PyCore.cpp
  PyCore.h
  README.md
  Source.cpp
.gitattributes
.gitignore
LICENSE
PSCAE.sln
README.md
```

# Files

## File: PSCAE/CoreLib/App.cpp
```cpp
#include "../pch.h"
#include "App.h"

Project App::getProject()
{
	Command cmd;
	std::string sessionID = createUUID();
	cmd.sessionID = sessionID;
	cmd.name = "getProject";
	cmd.args.push_back(sessionID);

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	std::string ID = resp.sessionID;
	if (ID != sessionID) {

		resp = mqm.receiveResponse();
	}
	Project project(ID);
	return project;
}


void App::reportInfo(std::string info) {
	MessageQueueManager mqm;


	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "reportInfo";
	cmd.args.push_back(info);


	mqm.sendCommand(cmd);
}

void App::beginUndoGroup(std::string undoName) {
	MessageQueueManager mqm;


	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "beginUndoGroup";
	cmd.args.push_back(undoName);


	mqm.sendCommand(cmd);

}

void App::endUndoGroup() {
	MessageQueueManager mqm;


	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "endUndoGroup";


	mqm.sendCommand(cmd);
}

void App::executeCommand(int commandId) {
	MessageQueueManager mqm;


	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "executeCommand";
	cmd.args.push_back(commandId);


	mqm.sendCommand(cmd);
}

std::string App::pluginPaths() {
	MessageQueueManager mqm;


	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "getPluginPaths";


	mqm.sendCommand(cmd);


	Response resp = mqm.receiveResponse();
	std::string ID = resp.sessionID;
	if (ID != this->sessionID) {

		resp = mqm.receiveResponse();
	}


	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}
```

## File: PSCAE/CoreLib/App.h
```c
#pragma once
#include "../MessageQueue.h"
#include "Project.h"


class App {
public:
    App() : sessionID(createUUID()) {}
    Project getProject();

    void beginUndoGroup(std::string undo_name = "Default Undo Group Name");
    void endUndoGroup();
    void executeCommand(int commandId);
    void reportInfo(std::string info);
    std::string pluginPaths();

private:
    std::string sessionID;
};
```

## File: PSCAE/CoreLib/ItemManager.cpp
```cpp
#include "../pch.h"
#include "ItemManager.h"

void Item::deleteItem()
{
	Command cmd;
	cmd.name = "DeleteItem";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

std::string Item::getItemHandle()
{
	return this->sessionID;
}


bool Item::isSelected()
{
	Command cmd;
	cmd.name = "IsItemSelected";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	bool output = boost::get<bool>(resp.args[0]);
	return output;
}

void Item::setSelected(bool select)
{
	Command cmd;
	cmd.name = "SelectItem";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(select);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

std::string Item::getName()
{
	Command cmd;
	cmd.name = "GetItemName";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}


void Item::setName(std::string name)
{
	Command cmd;
	cmd.name = "SetItemName";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(name);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

}

float Item::getWidth()
{
	Command cmd;
	cmd.name = "GetItemWidth";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	float output = boost::get<float>(resp.args[0]);
	return output;
}

float Item::getHeight()
{
	Command cmd;
	cmd.name = "GetItemHeight";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	float output = boost::get<float>(resp.args[0]);
	return output;
}

float Item::getCurrentTime()
{
	Command cmd;
	cmd.name = "GetItemCurrentTime";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	float output = boost::get<float>(resp.args[0]);
	return output;
}

float Item::getDuration()
{
	Command cmd;
	cmd.name = "GetItemDuration";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	float output = boost::get<float>(resp.args[0]);
	return output;
}

void Item::setCurrentTime(float time)
{
	Command cmd;
	cmd.name = "SetItemCurrentTime";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(time);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

float CompItem::getFrameRate()
{
	Command cmd;
	cmd.name = "GetCompFramerate";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	float output = boost::get<float>(resp.args[0]);
	return output;
}

void CompItem::setFrameRate(float frameRate)
{
	Command cmd;
	cmd.name = "SetCompFramerate";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(frameRate);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

float CompItem::getDuration()
{
	Command cmd;
	cmd.name = "GetCompWorkAreaDuration";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	float output = boost::get<float>(resp.args[0]);
	return output;
}


void CompItem::setDuration(float duration)
{
	Command cmd;
	cmd.name = "SetCompDuration";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(duration);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

void CompItem::setWidth(float width)
{
	Command cmd;
	cmd.name = "SetCompWidth";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(width);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

void CompItem::setHeight(float height)
{
	Command cmd;
	cmd.name = "SetCompHeight";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(height);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

std::shared_ptr<Layer> CompItem::newSolid(std::string name, float width, float height,float red, float green, float blue, float alpha,
						float duration)
{
	Command cmd;
	cmd.name = "CreateSolidInComp";
	cmd.args.push_back(name);
	cmd.args.push_back(width);
	cmd.args.push_back(height);
	cmd.args.push_back(red);
	cmd.args.push_back(green);
	cmd.args.push_back(blue);
	cmd.args.push_back(alpha);
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(duration);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	std::string layerHandle = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<Layer> layer = std::make_shared<Layer>(layerHandle);
	return layer;
}


std::shared_ptr<LayerCollection> CompItem::getSelectedLayers()
{
	Command cmd;
	cmd.name = "GetSelectedLayers";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	std::string compHandle = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<LayerCollection> layerCollection = std::make_shared<LayerCollection>(compHandle);
	return layerCollection;
}

std::shared_ptr<LayerCollection> CompItem::getLayers()
{
	Command cmd;
	cmd.name = "GetLayers";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	std::string outID = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<LayerCollection> layerCollection = std::make_shared<LayerCollection>(outID);
	return layerCollection;
}

int CompItem::NumLayers()
{
	Command cmd;
	cmd.name = "GetNumLayers";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	int output = boost::get<int>(resp.args[0]);
	return output;
}

float CompItem::getCurrentTime()
{
	Command cmd;
	cmd.name = "GetCompItemCurrentTime";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	float output = boost::get<float>(resp.args[0]);
	return output;
}

void CompItem::setCurrentTime(float time)
{
	Command cmd;
	cmd.name = "SetCompItemCurrentTime";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(time);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

void CompItem::addLayer(std::string name, std::string path, int index)
{
	Command cmd;
	cmd.name = "AddLayerToComp";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(name);
	cmd.args.push_back(path);
	cmd.args.push_back(index);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

std::string Layer::GetLayerName()
{
Command cmd;
	cmd.name = "GetLayerName";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}

std::string Layer::GetSourceName()
{
	Command cmd;
	cmd.name = "GetLayerSourceName";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}


void Layer::SetLayerName(std::string name)
{
	Command cmd;
	cmd.name = "SetLayerName";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(name);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

int Layer::index()
{
	Command cmd;
	cmd.name = "GetLayerIndex";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	int output = boost::get<int>(resp.args[0]);
	return output;
}

void Layer::changeIndex(int index)
{
	Command cmd;
	cmd.name = "ChangeLayerIndex";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(index);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

std::shared_ptr<FootageItem> Layer::duplicate()
{
	Command cmd;
	cmd.name = "DuplicateLayer";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	std::string output = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<FootageItem> footageItem = std::make_shared<FootageItem>(output);
	return footageItem;
}

float Layer::layerTime()
{
	Command cmd;
	cmd.name = "GetLayerCurrentTime";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	float output = boost::get<float>(resp.args[0]);
	return output;
}



float Layer::layerCompTime()
{
Command cmd;
	cmd.name = "GetLayerCurrentTime";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	float output = boost::get<float>(resp.args[0]);
	return output;
}



float Layer::inPoint()
{
	Command cmd;
	cmd.name = "GetLayerInPoint";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	float output = boost::get<float>(resp.args[0]);
	return output;
}

float Layer::compInPoint()
{
	Command cmd;
	cmd.name = "GetLayerInPoint";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	float output = boost::get<float>(resp.args[0]);
	return output;
}

float Layer::duration()
{
	Command cmd;
	cmd.name = "GetLayerDuration";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	float output = boost::get<float>(resp.args[0]);
	return output;
}

float Layer::compDuration()
{
	Command cmd;
	cmd.name = "GetLayerDuration";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	float output = boost::get<float>(resp.args[0]);
	return output;
}


std::string Layer::getQuality()
{
	Command cmd;
	cmd.name = "GetLayerQuality";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}


void Layer::setQuality(int quality)
{
	Command cmd;
	cmd.name = "SetLayerQuality";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(quality);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}


void Layer::deleteLayer()
{
	Command cmd;
	cmd.name = "DeleteLayer";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

float Layer::getOffset()
{
	Command cmd;
	cmd.name = "GetLayerOffset";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	float output = boost::get<float>(resp.args[0]);
	return output;
}

void Layer::setOffset(float offset)
{
	Command cmd;
	cmd.name = "SetLayerOffset";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(offset);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

void Layer::setFlag(LayerFlag flag, bool value)
{
	Command cmd;
	cmd.name = "SetLayerFlag";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(flag);
	cmd.args.push_back(value);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}

bool Layer::getFlag(LayerFlag flag)
{
	Command cmd;
	cmd.name = "GetLayerFlag";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(flag);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	bool output = boost::get<bool>(resp.args[0]);
	return output;
}


std::string Layer::getLayerSessionID()
{
return this->sessionID;
}

std::shared_ptr<Item> Layer::getSource()
{
	Command cmd;
	cmd.name = "GetLayerSource";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	std::string output = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<Item> item = std::make_shared<Item>(output);
	return item;
}

std::shared_ptr<ItemCollection> FolderItem::ChildItems()
{
	Command cmd;
	cmd.name = "GetChildItems";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	std::string ID = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<ItemCollection> itemCollection = std::make_shared<ItemCollection>(ID);
	return itemCollection;
}

void LayerCollection::removeLayerFromCollection(Layer layerHandle)
{
	Command cmd;
	cmd.name = "RemoveLayerFromCollection";
	cmd.sessionID = this->compHandle_;
	cmd.args.push_back(layerHandle.getLayerSessionID());

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

}

void LayerCollection::RemoveLayerByIndex(int index)
{
	Command cmd;
	cmd.name = "RemoveLayerByIndex";
	cmd.sessionID = this->compHandle_;
	cmd.args.push_back(index);

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

}

std::string LayerCollection::getCompName()
{
	Command cmd;
	cmd.name = "GetCompName";
	cmd.sessionID = this->compHandle_;

	MessageQueueManager mqm;

	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}

std::shared_ptr<Layer> LayerCollection::addLayerToCollection(Item itemHandle, int index) {
	Command cmd;
	cmd.name = "AddLayerToCollection";
	cmd.sessionID = this->compHandle_;
	cmd.args.push_back(itemHandle.getItemHandle());
	cmd.args.push_back(index);

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	std::string output = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<Layer> layer = std::make_shared<Layer>(output);
	return layer;
}

std::vector<std::shared_ptr<Item>> ItemCollection::getItems()
{
	std::vector<std::shared_ptr<Item>> items;
	Command cmd;
	cmd.name = "GetItems";

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	std::vector<std::string> itemHandles = boost::get<std::vector<std::string>>(resp.args[0]);
	std::vector<std::string> itemTypes = boost::get<std::vector<std::string>>(resp.args[1]);

	for (int i = 0; i < itemHandles.size(); i++) {
		if (itemTypes[i] == "Folder") {
			std::shared_ptr<FolderItem> folderItem = std::make_shared<FolderItem>(itemHandles[i]);
			items.push_back(folderItem);
		}
		else if (itemTypes[i] == "Footage") {
			std::shared_ptr<FootageItem> footageItem = std::make_shared<FootageItem>(itemHandles[i]);
			items.push_back(footageItem);
		}
		else if (itemTypes[i] == "Comp") {
			std::shared_ptr<CompItem> compItem = std::make_shared<CompItem>(itemHandles[i]);
			items.push_back(compItem);
		}
	return items;
}


std::string FootageItem::getPath()
{
	Command cmd;
	cmd.name = "GetFootagePath";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();

	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}

void FootageItem::replaceWithNewSource(std::string name, std::string path)
{
	Command cmd;
	cmd.name = "ReplaceFootage";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(name);
	cmd.args.push_back(path);
	cmd.sessionID = this->sessionID;

	MessageQueueManager mqm;
	mqm.sendCommand(cmd);
}
```

## File: PSCAE/CoreLib/ItemManager.h
```c
#pragma once
#include "../MessageQueue.h"

class Item;
class Layer;
class LayerCollection;
class CompItem;
class FootageItem;
class FolderItem;

namespace py = pybind11;


enum LayerFlag {
    VIDEO_ACTIVE = 0x00000001,
    AUDIO_ACTIVE = 0x00000002,
    EFFECTS_ACTIVE = 0x00000004,
    MOTION_BLUR = 0x00000008,
    FRAME_BLENDING = 0x00000010,
    LOCKED = 0x00000020,
    SHY = 0x00000040,
    COLLAPSE = 0x00000080,
    AUTO_ORIENT_ROTATION = 0x00000100,
    ADJUSTMENT_LAYER = 0x00000200,
    TIME_REMAPPING = 0x00000400,
    LAYER_IS_3D = 0x00000800,
    LOOK_AT_CAMERA = 0x00001000,
    LOOK_AT_POI = 0x00002000,
    SOLO = 0x00004000,
    MARKERS_LOCKED = 0x00008000,
    NULL_LAYER = 0x00010000,
    HIDE_LOCKED_MASKS = 0x00020000,
    GUIDE_LAYER = 0x00040000,
    ADVANCED_FRAME_BLENDING = 0x00080000,
    SUBLAYERS_RENDER_SEPARATELY = 0x00100000,
    ENVIRONMENT_LAYER = 0x00200000
};


enum qualityOptions {
    BEST ,
    DRAFT ,
    WIREFRAME ,
    NONE
};

class Layer {
public:
    explicit Layer(const std::string sessionID) : sessionID(sessionID) {};

    std::string GetLayerName();
    std::string GetSourceName();
    void SetLayerName(std::string name);
    int index();
    void changeIndex(int index);
    std::shared_ptr<FootageItem> duplicate();
    float layerTime();
    float layerCompTime();
    float inPoint();
    float compInPoint();
    float duration();
    float compDuration();
    std::string getQuality();
    void setQuality(int quality);
    void deleteLayer();
    float getOffset();
    void setOffset(float offset);
    void setFlag(LayerFlag flag, bool value);
    bool getFlag(LayerFlag flag);
    std::string getLayerSessionID();
    std::shared_ptr<Item> getSource();
protected:
    std::string sessionID;
    int index_;
    std::string name_;
    std::string sourceName_;
};


class Item {
public:
    explicit Item(const std::string& itemHandle) : sessionID(itemHandle) {}
    virtual ~Item() = default;

    std::string getName();
    void setName(std::string name);
    float getWidth();
    float getHeight();
    std::string name;
    float getDuration();
    float getCurrentTime();
    void setCurrentTime(float time);
    void deleteItem();
    std::string getItemHandle();
    bool isSelected();
    void setSelected(bool select);
protected:
    std::string sessionID;
};


class FootageItem : public Item, public std::enable_shared_from_this<FootageItem> {
public:

    explicit FootageItem(const std::string& itemHandle) : Item(itemHandle) {}
    virtual ~FootageItem() = default;

    static std::shared_ptr<FootageItem> createNew(std::string name, std::string path = NULL, int index = -1);
    std::string getPath();
    void replaceWithNewSource(std::string name, std::string path);
};
class LayerCollection {
public:
    explicit LayerCollection(const std::string& compHandle, std::vector<std::shared_ptr<Layer>> layers)
        : compHandle_(compHandle), layers_(std::move(layers)) {}
    LayerCollection(const std::string& compHandle) : compHandle_(compHandle) {
		layers_ = LayerCollection::getAllLayers();
	}
    auto begin() const { return layers_.cbegin(); }
    auto end() const { return layers_.cend(); }
    std::size_t size() const {
        return layers_.size();
    }

    std::shared_ptr<Layer>& operator[](std::size_t index) {
        if (index >= layers_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return layers_[index];
    }

    const std::shared_ptr<Layer>& operator[](std::size_t index) const {
        if (index >= layers_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return layers_[index];
    }


    auto begin() { return layers_.begin(); }
    auto end() { return layers_.end(); }

    std::shared_ptr<Layer> addLayerToCollection(Item itemHandle, int index = -1);
    std::shared_ptr<Layer> addSolidToCollection(Item itemHandle, int index = -1);
    void removeLayerFromCollection(Layer layerHandle);
    void RemoveLayerByIndex(int index);

    std::vector<std::shared_ptr<Layer>> getAllLayers() {
        return layers_;
    }

    std::string getCompName();

protected:
    std::string compHandle_;
    std::vector<std::shared_ptr<Layer>> layers_;
};



class CompItem : public Item {
public:
    explicit CompItem(const std::string& itemHandle) : Item(itemHandle) {}
    virtual ~CompItem() = default;

    std::shared_ptr<LayerCollection> getLayers();
    int NumLayers();
    float getCurrentTime();
    void setCurrentTime(float time);
    void addLayer(std::string name, std::string path = NULL, int index = -1);
    float getFrameRate();
    void setFrameRate(float frameRate);
    float getDuration();
    void setDuration(float duration);
    void setWidth(float width);
    std::shared_ptr<CompItem> duplicate();
    void setHeight(float height);
    std::shared_ptr<Layer> newSolid(std::string name, float width, float height,float red, float green, float blue, float alpha,
    float duration);
    std::shared_ptr<LayerCollection> getSelectedLayers();

    static std::shared_ptr<CompItem> CreateNew(std::string name, float width, float height, float frameRate, float duration, float aspectRatio);

};

class ItemCollection {
public:
    explicit ItemCollection(const std::string& itemHandle) : sessionID(itemHandle) {
        items_ = ItemCollection::getItems();
    }

    std::vector<std::shared_ptr<Item>> getItems();

    std::size_t size() const {
        return items_.size();
    }

    std::shared_ptr<Item>& operator[](std::size_t index) {
        if (index >= items_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return items_[index];
    }

    const std::shared_ptr<Item>& operator[](std::size_t index) const {
        if (index >= items_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return items_[index];
    }


    auto begin() { return items_.begin(); }
    auto end() { return items_.end(); }
    auto begin() const { return items_.cbegin(); }
    auto end() const { return items_.cend(); }
    std::vector<std::shared_ptr<Item>> append(std::shared_ptr<Item> item) {

        return items_;
    }
    std::vector<std::shared_ptr<Item>> remove(std::shared_ptr<Item> item) {
        if (item == nullptr) {
            throw std::runtime_error("Item is null");
        }
        Item item2 = *item;
        item2.deleteItem();

        return items_;
    }

private:
    std::string sessionID;
    std::vector<std::shared_ptr<Item>> items_;
};

class FolderItem : public Item {
public:

    explicit FolderItem(const std::string& itemHandle) : Item(itemHandle) {}
    virtual ~FolderItem() = default;

    static std::shared_ptr<FolderItem> createNew(std::string name);

    std::shared_ptr<ItemCollection> ChildItems();
};

class SolidItem : public FootageItem {
public:

	explicit SolidItem(const std::string& itemHandle) : FootageItem(itemHandle) {}
	virtual ~SolidItem() = default;

    static std::shared_ptr<SolidItem> createNew(std::string name, float width, float height,
        float red, float green, float blue, float alpha, float duration, int index = -1);

    std::vector<float> GetSolidColor();
    void SetSolidColor(float red, float green, float blue, float alpha);
    void SetSolidDimensions(float width, float height);
};

class AdjustmentLayer : public Layer {
public:
	explicit AdjustmentLayer(const std::string& layerHandle) : Layer(layerHandle) {}
	virtual ~AdjustmentLayer() = default;

    static std::shared_ptr<AdjustmentLayer> createNew(std::shared_ptr<CompItem> compH, std::string name = "Adjustment Layer");
};
```

## File: PSCAE/CoreLib/Project.cpp
```cpp
#include "../pch.h"
#include "Project.h"


std::shared_ptr<Item> Project::ActiveItem() {
	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "ActiveItem";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);

	MessageQueueManager mqm;

	mqm.sendCommand(cmd);
	Response resp = mqm.receiveResponse();
	std::string ID = resp.sessionID;
	if (ID != this->sessionID) {

		resp = mqm.receiveResponse();
	}

	std::string itemIDH = boost::get<std::string>(resp.args[0]);
	std::string type = boost::get<std::string>(resp.args[1]);
	if (itemIDH != itemID) {
		resp = mqm.receiveResponse();
	}
	if (type == "FolderItem") {
		std::shared_ptr<FolderItem> item = std::make_shared<FolderItem>(itemIDH);
		return item;
	}
	else if (type == "FootageItem") {
		std::shared_ptr<FootageItem> item = std::make_shared<FootageItem>(itemIDH);
		return item;
	}
	else if (type == "CompItem") {
		std::shared_ptr<CompItem> item = std::make_shared<CompItem>(itemIDH);
		return item;
	}
	else {
		std::shared_ptr<Item> item = std::make_shared<Item>(itemIDH);
		return item;
	}
}

std::shared_ptr<Layer> Project::GetActiveLayer()
{
	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "GetActiveLayer";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);

	MessageQueueManager mqm;

	mqm.sendCommand(cmd);
	Response resp = mqm.receiveResponse();
	std::string ID = resp.sessionID;
	if (ID != this->sessionID) {

		resp = mqm.receiveResponse();
	}

	std::string itemIDH = boost::get<std::string>(resp.args[0]);

	if (itemIDH != itemID) {
		resp = mqm.receiveResponse();
	}

	std::shared_ptr<Layer> layer = std::make_shared<Layer>(itemIDH);
	return layer;

}

std::string Project::getName()
{
Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "GetProjectName";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);

	MessageQueueManager mqm;

	mqm.sendCommand(cmd);
	Response resp = mqm.receiveResponse();
	std::string ID = resp.sessionID;
	if (ID != this->sessionID) {

		resp = mqm.receiveResponse();
	}

	std::string name = boost::get<std::string>(resp.args[0]);

	return name;
}

std::string Project::getPath()
{
Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "GetProjectPath";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);

	MessageQueueManager mqm;

	mqm.sendCommand(cmd);
	Response resp = mqm.receiveResponse();
	std::string ID = resp.sessionID;
	if (ID != this->sessionID) {

		resp = mqm.receiveResponse();
	}

	std::string path = boost::get<std::string>(resp.args[0]);

	return path;
}

void Project::saveAs(std::string path)
{
	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "SaveProjectAs";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);
	cmd.args.push_back(path);

	MessageQueueManager mqm;

	mqm.sendCommand(cmd);
}


std::shared_ptr<ProjectCollection> Project::ChildItems()
{
Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "getChildItems";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);

	MessageQueueManager mqm;

	mqm.sendCommand(cmd);
	Response resp = mqm.receiveResponse();
	std::string ID = resp.sessionID;
	if (ID != this->sessionID) {

		resp = mqm.receiveResponse();
	}

	std::string itemIDH = boost::get<std::string>(resp.args[0]);

	if (itemIDH != itemID) {
		resp = mqm.receiveResponse();
	}

	std::shared_ptr<ProjectCollection> collection = std::make_shared<ProjectCollection>(itemID);
	return collection;

}

std::shared_ptr<ProjectCollection> Project::SelectedItems()
{
	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "getSelectedItems";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);

	MessageQueueManager mqm;

	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	std::string ID = resp.sessionID;
	if (ID != this->sessionID) {

		resp = mqm.receiveResponse();
	}

	std::string itemIDH = boost::get<std::string>(resp.args[0]);

	if (itemIDH != itemID) {
		resp = mqm.receiveResponse();
	}

	std::shared_ptr<ProjectCollection> collection = std::make_shared<ProjectCollection>(itemID);
	return collection;
}

std::vector<std::shared_ptr<Item>> ProjectCollection::getItems()
{
	std::vector<std::shared_ptr<Item>> items;
	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "getItems";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);

	MessageQueueManager mqm;

	mqm.sendCommand(cmd);

	Response resp = mqm.receiveResponse();
	std::string ID = resp.sessionID;
	if (ID != this->sessionID) {

		resp = mqm.receiveResponse();
	}

	std::vector<std::string> itemIDs = boost::get<std::vector<std::string>>(resp.args[0]);


	for (int i = 0; i < itemIDs.size(); i++) {
		std::string itemIDH = itemIDs[i];
		std::string itemType = boost::get<std::string>(resp.args[1]);
		if (itemType == "FolderItem") {
			std::shared_ptr<FolderItem> item = std::make_shared<FolderItem>(itemIDH);
			items.push_back(item);
		}
		else if (itemType == "FootageItem") {
			std::shared_ptr<FootageItem> item = std::make_shared<FootageItem>(itemIDH);
			items.push_back(item);
		}
		else if (itemType == "CompItem") {
			std::shared_ptr<CompItem> item = std::make_shared<CompItem>(itemIDH);
			items.push_back(item);
		}
		else {
			std::shared_ptr<Item> item = std::make_shared<Item>(itemIDH);
			items.push_back(item);
		}
	}

	return items;
}
```

## File: PSCAE/CoreLib/Project.h
```c
#pragma once
#include "../MessageQueue.h"
#include "ItemManager.h"



class ProjectCollection {
public:
    explicit ProjectCollection(const std::string seessionID) {
        items_ = ProjectCollection::getItems();
    }

    std::vector<std::shared_ptr<Item>> getItems();

    std::size_t size() const {
        return items_.size();
    }

    std::shared_ptr<Item>& operator[](std::size_t index) {
        if (index >= items_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return items_[index];
    }

    const std::shared_ptr<Item>& operator[](std::size_t index) const {
        if (index >= items_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return items_[index];
    }


    auto begin() { return items_.begin(); }
    auto end() { return items_.end(); }
    auto begin() const { return items_.cbegin(); }
    auto end() const { return items_.cend(); }

    std::vector<std::shared_ptr<Item>> append(std::shared_ptr<Item> item) {
	}

    std::vector<std::shared_ptr<Item>> remove(std::shared_ptr<Item> item) {
        if (item == nullptr) {
            throw std::runtime_error("Item is null");
        }
        Item item2 = *item;
        item2.deleteItem();
	}

private:
    std::string sessionID;
    std::vector<std::shared_ptr<Item>> items_;
};


class Project {
public:
    Project() = default;
    Project(std::string sessionID) : sessionID(sessionID) {}

    std::shared_ptr<Item> ActiveItem();
    std::shared_ptr<Layer> GetActiveLayer();
    std::string getName();
    std::string getPath();
    void saveAs(std::string path);
    std::shared_ptr<ProjectCollection> ChildItems();
    std::shared_ptr<ProjectCollection> SelectedItems();
private:
    std::shared_ptr<Item> activeItem;
    std::string sessionID;
};
```

## File: PSCAE/CoreLib/PyCore.cpp
```cpp
#include "../pch.h"
#include "PyCore.h"
#include <filesystem>










void Manifest::validate()
{

    this->_validate_versions();
    this->_validate_paths();
    this->_validate_dependencies();
}

void Manifest::load()
{

    this->_load_main();
}

void Manifest::_validate_versions()
{

    auto& valid_versions = this->_validVersions;
    auto& AE_VERS = this->AE_VERS;


    for (auto& version : AE_VERS) {
        if (std::find(valid_versions.begin(), valid_versions.end(), version) == valid_versions.end()) {
            throw std::invalid_argument("Invalid AE version: " + version);
        }
    }
}

void Manifest::_validate_paths()
{

    auto& entry = this->_entry;

    if (!std::filesystem::exists(entry)) {
        throw std::invalid_argument("Missing entry script: " + entry);
    }

}

void Manifest::_validate_dependencies()
{

    auto& dependencies = this->_dependencies;
    for (auto& dependency : dependencies) {
        try {
            py::module_::import(dependency.c_str());
        }
        catch (py::error_already_set& e) {
            throw std::invalid_argument("Missing dependency: " + dependency);
        }
    }
}

void Manifest::_load_main()
{

    auto& entry = this->_entry;


    py::module_ main = py::module_::import(entry.c_str());
    this->_main = main;

}

void bindLayerEnum(py::module_& m)
{
    py::enum_<qualityOptions>(m, "Quality")
        .value("BEST", qualityOptions::BEST)
        .value("DRAFT", qualityOptions::DRAFT)
        .value("WIREFRAME", qualityOptions::WIREFRAME)
        .value("NONE", qualityOptions::NONE)
        .export_values();

    py::enum_<LayerFlag>(m, "LayerFlag")
        .value("VIDEO_ACTIVE", LayerFlag::VIDEO_ACTIVE)
        .value("AUDIO_ACTIVE", LayerFlag::AUDIO_ACTIVE)
        .value("EFFECTS_ACTIVE", LayerFlag::EFFECTS_ACTIVE)
        .value("MOTION_BLUR", LayerFlag::MOTION_BLUR)
        .value("FRAME_BLENDING", LayerFlag::FRAME_BLENDING)
        .value("LOCKED", LayerFlag::LOCKED)
        .value("SHY", LayerFlag::SHY)
        .value("COLLAPSE", LayerFlag::COLLAPSE)
        .value("AUTO_ORIENT_ROTATION", LayerFlag::AUTO_ORIENT_ROTATION)
        .value("ADJUSTMENT_LAYER", LayerFlag::ADJUSTMENT_LAYER)
        .value("TIME_REMAPPING", LayerFlag::TIME_REMAPPING)
        .value("LAYER_IS_3D", LayerFlag::LAYER_IS_3D)
        .value("LOOK_AT_CAMERA", LayerFlag::LOOK_AT_CAMERA)
        .value("LOOK_AT_POI", LayerFlag::LOOK_AT_POI)
        .value("SOLO", LayerFlag::SOLO)
        .value("MARKERS_LOCKED", LayerFlag::MARKERS_LOCKED)
        .value("NULL_LAYER", LayerFlag::NULL_LAYER)
        .value("HIDE_LOCKED_MASKS", LayerFlag::HIDE_LOCKED_MASKS)
        .value("GUIDE_LAYER", LayerFlag::GUIDE_LAYER)
        .value("ADVANCED_FRAME_BLENDING", LayerFlag::ADVANCED_FRAME_BLENDING)
        .value("SUBLAYERS_RENDER_SEPARATELY", LayerFlag::SUBLAYERS_RENDER_SEPARATELY)
        .value("ENVIRONMENT_LAYER", LayerFlag::ENVIRONMENT_LAYER)
        .export_values();

}


void bindLayer(py::module_& m)
{
    py::class_<Layer, std::shared_ptr<Layer>>(m, "Layer")
        .def(py::init<const std::string&>())
        .def_property("name", &Layer::GetLayerName, &Layer::SetLayerName)
        .def_property("quality", &Layer::getQuality, &Layer::setQuality)
        .def_property("startTime", &Layer::getOffset, &Layer::setOffset)
        .def_property("index", &Layer::index, &Layer::changeIndex)
        .def_property("video_active", [](Layer& self) {return self.getFlag(LayerFlag::VIDEO_ACTIVE); },
            			[](Layer& self, bool value) {self.setFlag(LayerFlag::VIDEO_ACTIVE, value); })
        .def_property("audio_active", [](Layer& self) {return self.getFlag(LayerFlag::AUDIO_ACTIVE); },
            						[](Layer& self, bool value) {self.setFlag(LayerFlag::AUDIO_ACTIVE, value); })
        .def_property("effects_active", [](Layer& self) {return self.getFlag(LayerFlag::EFFECTS_ACTIVE); },
            									[](Layer& self, bool value) {self.setFlag(LayerFlag::EFFECTS_ACTIVE, value); })
        .def_property("motion_blur", [](Layer& self) {return self.getFlag(LayerFlag::MOTION_BLUR); },
            [](Layer& self, bool value) {self.setFlag(LayerFlag::MOTION_BLUR, value); })
        .def_property("frame_blending", [](Layer& self) {return self.getFlag(LayerFlag::FRAME_BLENDING); },
            			[](Layer& self, bool value) {self.setFlag(LayerFlag::FRAME_BLENDING, value); })
        .def_property("locked", [](Layer& self) {return self.getFlag(LayerFlag::LOCKED); },
            								[](Layer& self, bool value) {self.setFlag(LayerFlag::LOCKED, value); })
        .def_property("shy", [](Layer& self) {return self.getFlag(LayerFlag::SHY); },
            [](Layer& self, bool value) {self.setFlag(LayerFlag::SHY, value); })
        .def_property("collapse", [](Layer& self) {return self.getFlag(LayerFlag::COLLAPSE); },
            										[](Layer& self, bool value) {self.setFlag(LayerFlag::COLLAPSE, value); })
        .def_property("auto_orient_rotation", [](Layer& self) {return self.getFlag(LayerFlag::AUTO_ORIENT_ROTATION); },
            															[](Layer& self, bool value) {self.setFlag(LayerFlag::AUTO_ORIENT_ROTATION, value); })
        .def_property("adjustment_layer", [](Layer& self) {return self.getFlag(LayerFlag::ADJUSTMENT_LAYER); },
            			[](Layer& self, bool value) {self.setFlag(LayerFlag::ADJUSTMENT_LAYER, value); })
        .def_property("time_remapping", [](Layer& self) {return self.getFlag(LayerFlag::TIME_REMAPPING); },
            												[](Layer& self, bool value) {self.setFlag(LayerFlag::TIME_REMAPPING, value); })
        .def_property("layer_is_3d", [](Layer& self) {return self.getFlag(LayerFlag::LAYER_IS_3D); },
            [](Layer& self, bool value) {self.setFlag(LayerFlag::LAYER_IS_3D, value); })
        .def_property("look_at_camera", [](Layer& self) {return self.getFlag(LayerFlag::LOOK_AT_CAMERA); },
            															[](Layer& self, bool value) {self.setFlag(LayerFlag::LOOK_AT_CAMERA, value); })
        .def_property("look_at_poi", [](Layer& self) {return self.getFlag(LayerFlag::LOOK_AT_POI); },
            			[](Layer& self, bool value) {self.setFlag(LayerFlag::LOOK_AT_POI, value); })
        .def_property("solo", [](Layer& self) {return self.getFlag(LayerFlag::SOLO); },
            											[](Layer& self, bool value) {self.setFlag(LayerFlag::SOLO, value); })
        .def_property("markers_locked", [](Layer& self) {return self.getFlag(LayerFlag::MARKERS_LOCKED); },
            																[](Layer& self, bool value) {self.setFlag(LayerFlag::MARKERS_LOCKED, value); })
        .def_property("null_layer", [](Layer& self) {return self.getFlag(LayerFlag::NULL_LAYER); },
            				[](Layer& self, bool value) {self.setFlag(LayerFlag::NULL_LAYER, value); })
        .def_property("hide_locked_masks", [](Layer& self) {return self.getFlag(LayerFlag::HIDE_LOCKED_MASKS); },
            																			[](Layer& self, bool value) {self.setFlag(LayerFlag::HIDE_LOCKED_MASKS, value); })
        .def_property("guide_layer", [](Layer& self) {return self.getFlag(LayerFlag::GUIDE_LAYER); },
            				[](Layer& self, bool value) {self.setFlag(LayerFlag::GUIDE_LAYER, value); })
        .def_property("advanced_frame_blending", [](Layer& self) {return self.getFlag(LayerFlag::ADVANCED_FRAME_BLENDING); },
            																							[](Layer& self, bool value) {self.setFlag(LayerFlag::ADVANCED_FRAME_BLENDING, value); })
        .def_property("sublayers_render_separately", [](Layer& self) {return self.getFlag(LayerFlag::SUBLAYERS_RENDER_SEPARATELY); },
            																												[](Layer& self, bool value) {self.setFlag(LayerFlag::SUBLAYERS_RENDER_SEPARATELY, value); })
        .def_property("environment_layer", [](Layer& self) {return self.getFlag(LayerFlag::ENVIRONMENT_LAYER); },
            				[](Layer& self, bool value) {self.setFlag(LayerFlag::ENVIRONMENT_LAYER, value); })

        .def_property_readonly("sourceName", &Layer::GetSourceName)
        .def_property_readonly("time", &Layer::layerTime)
        .def_property_readonly("compTime", &Layer::layerCompTime)
        .def_property_readonly("inPoint", &Layer::inPoint)
        .def_property_readonly("compInPoint", &Layer::compInPoint)
        .def_property_readonly("duration", &Layer::duration)
        .def_property_readonly("compDuration", &Layer::compDuration)
        .def_property_readonly("source", &Layer::getSource, py::return_value_policy::reference)
        .def("delete", &Layer::deleteLayer)
        .def("duplicate", &Layer::duplicate);

}

void bindLayerCollection(py::module_& m) {
    py::class_<LayerCollection, std::shared_ptr<LayerCollection>>(m, "LayerCollection")
        .def(py::init<const std::string&, std::vector<std::shared_ptr<Layer>>>())
        .def("__getitem__", [](const LayerCollection& c, size_t i) {
        if (i < 0 || i >= c.size()) throw py::index_error();
        return c[i];
            }, py::return_value_policy::reference)
        .def("__setitem__", [](LayerCollection& c, size_t i, std::shared_ptr<Layer> l) {
                if (i >= c.size()) throw py::index_error();
                if (i < c.size()) {
                    c[i] = l;
                }
            })
        .def("__len__", [](const LayerCollection& c) { return c.size(); })
        .def("__iter__", [](const LayerCollection& c) {
        return py::make_iterator(c.begin(), c.end());
            }, py::keep_alive<0, 1>())




        .def("__str__", [](LayerCollection& c) {
            return c.getCompName();
            })

        .def("append", &LayerCollection::addLayerToCollection, py::arg("layer"), py::arg("index") = -1)
        .def("insert", &LayerCollection::addLayerToCollection, py::arg("layer"), py::arg("index"))
        .def("remove", &LayerCollection::removeLayerFromCollection, py::arg("layer"))
        .def("pop", &LayerCollection::RemoveLayerByIndex, py::arg("index") = -1)
        .def("getAllLayers", &LayerCollection::getAllLayers);

}

void bindSolidItem(py::module_& m)
{
    py::class_<SolidItem, FootageItem, std::shared_ptr<SolidItem>>(m, "SolidItem")
        .def(py::init(&SolidItem::createNew), py::arg("name") = "New Solid", py::arg("width") = 0,
            py::arg("height") = 0, py::arg("red") = 0, py::arg("green") = 0, py::arg("blue") = 0, py::arg("alpha") = 0, py::arg("duration") = 0, py::arg("index") = -1);
}

void bindItem(py::module_& m)
{
    py::class_<Item, std::shared_ptr<Item>>(m, "Item")
        .def(py::init<const std::string&>())
        .def_property_readonly("width", &Item::getWidth)
        .def_property_readonly("height", &Item::getHeight)
        .def_property_readonly("duration", &Item::getDuration)
        .def_property("time", &Item::getCurrentTime, &Item::setCurrentTime)
        .def_property("selected", &Item::isSelected, &Item::setSelected)
        .def_property("name",
            &Item::getName,
            &Item::setName);
}

void bindItemCollection(py::module_& m) {
    py::class_<ItemCollection, std::shared_ptr<ItemCollection>>(m, "ItemCollection")
        .def(py::init<const std::string&>())
        .def("__getitem__", [](const ItemCollection& c, int i) {

            size_t index = (i < 0) ? c.size() + i : i;

            if (index >= c.size()) throw py::index_error();
            return c[index];
                }, py::return_value_policy::reference)


        .def("__len__", [](const ItemCollection& c) { return c.size(); })
        .def("__iter__", [](const ItemCollection& c) {
        return py::make_iterator(c.begin(), c.end());
            }, py::keep_alive<0, 1>())

        .def("append", &ItemCollection::append, py::arg("item"))
        .def("remove", &ItemCollection::remove, py::arg("item"));
}

void bindCompItem(py::module_& m)
{


    py::class_<CompItem, Item, std::shared_ptr<CompItem>>(m, "CompItem")
        .def(py::init(&CompItem::CreateNew),
            py::arg("name") = "New Comp",
            py::arg("width") = 1920,
            py::arg("height") = 1080,
            py::arg("frameRate") = 24.0,
            py::arg("duration") = 10,
            py::arg("aspectRatio") = 1.0)
        .def_property_readonly("layer", &CompItem::getLayers, py::return_value_policy::reference)
        .def_property_readonly("layers", &CompItem::getLayers, py::return_value_policy::reference)
        .def_property_readonly("selectedLayers", &CompItem::getSelectedLayers, py::return_value_policy::reference)
        .def_property_readonly("selectedLayer", &CompItem::getSelectedLayers, py::return_value_policy::reference)
        .def_property_readonly("numLayers", &CompItem::NumLayers)
        .def_property("width", &Item::getWidth, &CompItem::setWidth)
        .def_property("height", &Item::getHeight, &CompItem::setHeight)
        .def_property("duration", &CompItem::getDuration, &CompItem::setDuration)
        .def_property("time", &CompItem::getCurrentTime, &CompItem::setCurrentTime)
        .def_property("frameRate",
            &CompItem::getFrameRate,
            &CompItem::setFrameRate);
}

void bindFootageItem(py::module_& m)
{
    py::class_<FootageItem, Item, std::shared_ptr<FootageItem>>(m, "FootageItem")
        .def(py::init(&FootageItem::createNew), py::arg("name") = "New Layer", py::arg("path") = NULL, py::arg("index") = -1)
        .def_property_readonly("path", &FootageItem::getPath)
        .def("replace", &FootageItem::replaceWithNewSource, py::arg("name"), py::arg("path"));
}

void bindProjectCollection(py::module_& m) {
    py::class_<ProjectCollection, std::shared_ptr<ProjectCollection>>(m, "ProjectCollection")
        .def(py::init<const std::string&>())
        .def("__getitem__", [](const ProjectCollection& c, int i) {

            size_t index = (i < 0) ? c.size() + i : i;

            if (index >= c.size()) throw py::index_error();
            return c[index];
                }, py::return_value_policy::reference)

        .def("__len__", [](const ProjectCollection& c) { return c.size(); })
        .def("__iter__", [](const ProjectCollection& c) {
            return py::make_iterator(c.begin(), c.end());
            }, py::keep_alive<0, 1>())

        .def("append", &ProjectCollection::append, py::arg("item"))
        .def("remove", &ProjectCollection::remove, py::arg("item"));

}

void bindFolderItem(py::module_& m)
{
    py::class_<FolderItem, Item, std::shared_ptr<FolderItem>>(m, "FolderItem")
        .def(py::init(&FolderItem::createNew), py::arg("name") = "New Folder")
        .def_property_readonly("children", &FolderItem::ChildItems, py::return_value_policy::reference);

}

void bindAdjustmentLayerItem(py::module_& m)
{
    py::class_<AdjustmentLayer, Layer, std::shared_ptr<AdjustmentLayer>>(m, "AdjustmentLayer")

        .def(py::init(&AdjustmentLayer::createNew), py::arg("comp"), py::arg("name") = "Adjustment Layer");
}

void bindProject(py::module_& m)
{
    py::class_<Project, std::shared_ptr<Project>>(m, "Project")
        .def(py::init<>())
        .def_property_readonly("activeItem", &Project::ActiveItem, py::return_value_policy::reference)
        .def_property_readonly("activeLayer", &Project::GetActiveLayer, py::return_value_policy::reference)
        .def_property_readonly("name", &Project::getName)
        .def_property_readonly("path", &Project::getPath)
        .def_property_readonly("items", &Project::ChildItems, py::return_value_policy::reference)
        .def_property_readonly("selectedItems", &Project::SelectedItems, py::return_value_policy::reference)
        .def("saveAs", &Project::saveAs, py::arg("path"));

}

void bindApp(py::module_& m)
{

    py::class_<App, std::shared_ptr<App>>(m, "App")
        .def(py::init<>())
        .def_property_readonly("path", &App::pluginPaths)
        .def_readwrite("project", &App::getProject)
        .def("beginUndoGroup", &App::beginUndoGroup, py::arg("undo_name") = "Default Undo Group Name")
        .def("endUndoGroup", &App::endUndoGroup)
        .def("reportInfo", [](App& self, py::object info) {
        std::string infoStr = py::str(info);
        self.reportInfo(infoStr);
            }, py::arg("info"));

    auto appInstance = std::make_shared<App>();
    m.attr("app") = appInstance;

}

void bindManifest(py::module_& m)
{
    py::class_<Manifest>(m, "Manifest")
        .def(py::init<>())
        .def_readwrite("name", &Manifest::name)
        .def_readwrite("version", &Manifest::version)
        .def_readwrite("author", &Manifest::author)
        .def_readwrite("description", &Manifest::description)
        .def_readwrite("entry", &Manifest::entryPath)
        .def_readwrite("main", &Manifest::mainPath)
        .def_readwrite("use_js", &Manifest::useJS)
        .def_readwrite("dependencies", &Manifest::dependenciesFolder);
}
```

## File: PSCAE/CoreLib/PyCore.h
```c
#pragma once

#include "App.h"
#include "Project.h"
#include "ItemManager.h"
#include <pybind11/pybind11.h>
#include <pybind11/embed.h>
#include <pybind11/stl.h>
#include <pybind11/stl_bind.h>
#include <pybind11/functional.h>

namespace py = pybind11;


void bindItem(py::module_& m);
void bindCompItem(py::module_& m);
void bindFootageItem(py::module_& m);
void bindFolderItem(py::module_& m);

void bindProject(py::module_& m);
void bindApp(py::module_& m);
void bindLayer(py::module_& m);
void bindLayerEnum(py::module_& m);
void bindLayerCollection(py::module_& m);
void bindSolidItem(py::module_& m);
void bindProjectCollection(py::module_& m);
void bindItemCollection(py::module_& m);
void bindAdjustmentLayerItem(py::module_& m);
void bindManifest(py::module_& m);

class Manifest {
public:
    Manifest() :
		_validVersions({ "AE2020", "AE2021", "AE2022", "AE2023", "AE2024", "AE2025", "AE2026", "AE2027", "AE2028", "AE2029", "AE2030" }),
		_pythonDefault("3.11"),
		name("Plugin Name"),
		version("1.0.0"),
        useJS(false),
		author("Author Name"),
		description("A Python-based plugin for After Effects."),
		entryPath("path/to/entry_script.py"),
        mainPath("path/to/main_script.py"),
		dependenciesFolder({ "numpy", "opencv-python" })
	{}


    std::string name;
    std::string version;
    std::string author;
    std::string description;
    std::vector<std::string> AE_VERS;
    std::string entryPath;
    std::string mainPath;
    std::vector<std::string> dependenciesFolder;
    bool useJS = false;
    void validate();
    void load();

private:
    void _validate_versions();
	void _validate_paths();
	void _validate_dependencies();
	void _load_main();
    std::vector<std::string> _validVersions = {"AE2020", "AE2021", "AE2022", "AE2023", "AE2024", "AE2025", "AE2026", "AE2027", "AE2028", "AE2029", "AE2030"};
    std::string _pythonDefault = "3.11";
    std::string _entry;
    std::vector<std::string> _dependencies;
    py::module_ _main;

};
```

## File: PSCAE/App.cpp
```cpp
#include "pch.h"
#include "App.h"

Project App::getProject()
{
	try {
		Command cmd;
		std::string sessionID = createUUID();
		cmd.sessionID = sessionID;
		cmd.name = "getProject";
		cmd.args.push_back(sessionID);

		auto& mqm = MessageQueueManager::getInstance();
		mqm.sendCommand(cmd);

		Response resp;
		while (!mqm.tryReceiveResponse(resp)) {
			std::this_thread::sleep_for(std::chrono::milliseconds(100));
		}
		std::string ID = resp.sessionID;

		std::string projectID = boost::get<std::string>(resp.args[0]);
		Project project(projectID);
		return project;
	}
	catch (std::exception& e) {
		std::cout << "Exception: " << e.what() << std::endl;
		throw std::runtime_error("Error getting project + " + std::string(e.what()));
	}
}


void App::reportInfo(std::string info) {
		auto& mqm = MessageQueueManager::getInstance();


	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "reportInfo";
	cmd.args.push_back(info);


	mqm.sendCommand(cmd);
}

void App::beginUndoGroup(std::string undoName) {
		auto& mqm = MessageQueueManager::getInstance();


	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "beginUndoGroup";
	cmd.args.push_back(undoName);


	mqm.sendCommand(cmd);

}

void App::endUndoGroup() {
		auto& mqm = MessageQueueManager::getInstance();


	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "endUndoGroup";


	mqm.sendCommand(cmd);
}

void App::executeCommand(int commandId) {
		auto& mqm = MessageQueueManager::getInstance();


	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "executeCommand";
	cmd.args.push_back(commandId);


	mqm.sendCommand(cmd);
}

std::string App::pluginPaths() {
	auto& mqm = MessageQueueManager::getInstance();


	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "getPluginPaths";
	cmd.args.push_back(this->sessionID);

	mqm.sendCommand(cmd);


	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::string ID = resp.sessionID;


	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}
```

## File: PSCAE/App.h
```c
#pragma once
#include "MessageQueue.h"
#include "Project.h"


class App {
public:
    App() : sessionID(createUUID()) {}
    Project getProject();

    void beginUndoGroup(std::string undo_name = "Default Undo Group Name");
    void endUndoGroup();
    void executeCommand(int commandId);
    void reportInfo(std::string info);
    std::string pluginPaths();

private:
    std::string sessionID;
};
```

## File: PSCAE/framework.h
```c
#pragma once

#define WIN32_LEAN_AND_MEAN

#include <windows.h>
```

## File: PSCAE/ItemManager.cpp
```cpp
#include "pch.h"
#include "ItemManager.h"

void Item::deleteItem()
{
	Command cmd;
	cmd.name = "DeleteItem";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

std::string Item::getItemHandle()
{
	return this->sessionID;
}


bool Item::isSelected()
{
	Command cmd;
	cmd.name = "IsItemSelected";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	bool output = boost::get<bool>(resp.args[0]);
	return output;
}

void Item::setSelected(bool select)
{
	Command cmd;
	cmd.name = "SelectItem";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(select);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

std::string Item::getName()
{
	Command cmd;
	cmd.name = "GetItemName";
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}


void Item::setName(std::string name)
{
	Command cmd;
	cmd.name = "SetItemName";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(name);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

}

float Item::getWidth()
{
	try {
	Command cmd;
	cmd.name = "GetItemWidth";
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	float output = boost::get<float>(resp.args[0]);
	return output;
} catch (boost::bad_get& e) {
	std::cout << e.what() << std::endl;
	throw std::runtime_error("Error in gathering Width:" + std::string(e.what()));
}
catch (std::exception& e) {
	std::cout << e.what() << std::endl;
	throw std::runtime_error("Error in gathering Width:" + std::string(e.what()));
}
}

float Item::getHeight()
{
	try {
	Command cmd;
	cmd.name = "GetItemHeight";
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	float output = boost::get<float>(resp.args[0]);
	return output;
} catch (boost::bad_get& e) {
	std::cout << e.what() << std::endl;
	throw std::runtime_error("Error in gathering Height:" + std::string(e.what()));
}
catch (std::exception& e) {
	std::cout << e.what() << std::endl;
	throw std::runtime_error("Error in gathering Height:" + std::string(e.what()));
}
}

float Item::getCurrentTime()
{
	Command cmd;
	cmd.name = "GetItemCurrentTime";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	float output = boost::get<float>(resp.args[0]);
	return output;
}

float Item::getDuration()
{
	Command cmd;
	cmd.name = "GetItemDuration";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	float output = boost::get<float>(resp.args[0]);
	return output;
}

void Item::setCurrentTime(float time)
{
	Command cmd;
	cmd.name = "SetItemCurrentTime";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(time);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

float CompItem::getFrameRate()
{
	Command cmd;
	cmd.name = "GetCompFramerate";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	float output = boost::get<float>(resp.args[0]);
	return output;
}

void CompItem::setFrameRate(float frameRate)
{
	Command cmd;
	cmd.name = "SetCompFramerate";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(frameRate);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

float CompItem::getDuration()
{
	Command cmd;
	cmd.name = "GetCompWorkAreaDuration";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	float output = boost::get<float>(resp.args[0]);
	return output;
}


void CompItem::setDuration(float duration)
{
	Command cmd;
	cmd.name = "SetCompDuration";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(duration);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

void CompItem::setWidth(float width)
{
	Command cmd;
	cmd.name = "SetCompWidth";
	cmd.args.push_back(width);
	cmd.sessionID = this->sessionID;

	auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

void CompItem::setHeight(float height)
{
	Command cmd;
	cmd.name = "SetCompHeight";
	cmd.args.push_back(height);
	cmd.sessionID = this->sessionID;

	auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

std::shared_ptr<Layer> CompItem::newSolid(std::string name, float width, float height,float red, float green, float blue, float alpha,
						float duration)
{
	Command cmd;
	cmd.name = "CreateSolidInComp";
	cmd.args.push_back(name);
	cmd.args.push_back(width);
	cmd.args.push_back(height);
	cmd.args.push_back(red);
	cmd.args.push_back(green);
	cmd.args.push_back(blue);
	cmd.args.push_back(alpha);
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(duration);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	std::string layerHandle = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<Layer> layer = std::make_shared<Layer>(layerHandle);
	return layer;
}


std::shared_ptr<LayerCollection> CompItem::getSelectedLayers()
{
	Command cmd;
	cmd.name = "GetSelectedLayers";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	std::string compHandle = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<LayerCollection> layerCollection = std::make_shared<LayerCollection>(compHandle);
	return layerCollection;
}

std::shared_ptr<CompItem> CompItem::CreateNew(std::string name, float width, float height, float frameRate, float duration, float aspectRatio)
{
	return std::shared_ptr<CompItem>();
}

std::shared_ptr<LayerCollection> CompItem::getLayers()
{
	try {
		Command cmd;
		cmd.name = "GetLayers";
		cmd.args.push_back(this->sessionID);
		cmd.sessionID = this->sessionID;

			auto& mqm = MessageQueueManager::getInstance();
		mqm.sendCommand(cmd);
		Response resp;
		while (!mqm.tryReceiveResponse(resp)) {
			std::this_thread::sleep_for(std::chrono::milliseconds(100));
		}
		std::string outID = boost::get<std::string>(resp.args[0]);
		std::shared_ptr<LayerCollection> layerCollection = std::make_shared<LayerCollection>(outID);
		return layerCollection;

	} catch (boost::bad_get& e) {
		std::cout << e.what() << std::endl;
	}
	catch (std::exception& e) {
		std::cout << e.what() << std::endl;
	}
}

int CompItem::NumLayers()
{
	Command cmd;
	cmd.name = "GetNumLayers";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	int output = boost::get<int>(resp.args[0]);
	return output;
}

float CompItem::getCurrentTime()
{
	Command cmd;
	cmd.name = "GetCompItemCurrentTime";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	float output = boost::get<float>(resp.args[0]);
	return output;
}

void CompItem::setCurrentTime(float time)
{
	Command cmd;
	cmd.name = "SetCompItemCurrentTime";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(time);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

void CompItem::addLayer(std::string name, std::string path, int index)
{
	Command cmd;
	cmd.name = "AddLayerToComp";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(name);
	cmd.args.push_back(path);
	cmd.args.push_back(index);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

std::string Layer::GetLayerName()
{
Command cmd;
	cmd.name = "GetLayerName";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}

std::string Layer::GetSourceName()
{
	Command cmd;
	cmd.name = "GetLayerSourceName";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}


void Layer::SetLayerName(std::string name)
{
	Command cmd;
	cmd.name = "SetLayerName";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(name);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

int Layer::index()
{
	Command cmd;
	cmd.name = "GetLayerIndex";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	int output = boost::get<int>(resp.args[0]);
	return output;
}

void Layer::changeIndex(int index)
{
	Command cmd;
	cmd.name = "ChangeLayerIndex";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(index);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

std::shared_ptr<FootageItem> Layer::duplicate()
{
	Command cmd;
	cmd.name = "DuplicateLayer";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::string output = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<FootageItem> footageItem = std::make_shared<FootageItem>(output);
	return footageItem;
}

float Layer::layerTime()
{
	Command cmd;
	cmd.name = "GetLayerCurrentTime";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	float output = boost::get<float>(resp.args[0]);
	return output;
}



float Layer::layerCompTime()
{
Command cmd;
	cmd.name = "GetLayerCompTime";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	float output = boost::get<float>(resp.args[0]);
	return output;
}



float Layer::inPoint()
{
	Command cmd;
	cmd.name = "GetLayerInPoint";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	float output = boost::get<float>(resp.args[0]);
	return output;
}

float Layer::compInPoint()
{
	Command cmd;
	cmd.name = "GetLayerInPoint";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	float output = boost::get<float>(resp.args[0]);
	return output;
}

float Layer::duration()
{
	Command cmd;
	cmd.name = "GetLayerDuration";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	float output = boost::get<float>(resp.args[0]);
	return output;
}

float Layer::compDuration()
{
	Command cmd;
	cmd.name = "GetLayerCompDuration";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	float output = boost::get<float>(resp.args[0]);
	return output;
}


std::string Layer::getQuality()
{
	Command cmd;
	cmd.name = "GetLayerQuality";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}


void Layer::setQuality(int quality)
{
	Command cmd;
	cmd.name = "SetLayerQuality";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(quality);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}


void Layer::deleteLayer()
{
	Command cmd;
	cmd.name = "DeleteLayer";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

float Layer::getOffset()
{
	Command cmd;
	cmd.name = "GetLayerOffset";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	float output = boost::get<float>(resp.args[0]);
	return output;
}

void Layer::setOffset(float offset)
{
	Command cmd;
	cmd.name = "SetLayerOffset";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(offset);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

void Layer::setFlag(LayerFlag flag, bool value)
{
	Command cmd;
	cmd.name = "SetLayerFlag";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(flag);
	cmd.args.push_back(value);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

bool Layer::getFlag(LayerFlag flag)
{
	Command cmd;
	cmd.name = "GetLayerFlag";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(flag);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	bool output = boost::get<bool>(resp.args[0]);
	return output;
}


std::string Layer::getLayerSessionID()
{
return this->sessionID;
}

std::shared_ptr<Item> Layer::getSource()
{
	Command cmd;
	cmd.name = "GetLayerSource";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::string output = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<FootageItem> item = std::make_shared<FootageItem>(output);
	return item;
}

std::shared_ptr<FolderItem> FolderItem::createNew(std::string name)
{
	return std::shared_ptr<FolderItem>();
}

std::shared_ptr<ItemCollection> FolderItem::ChildItems()
{
	Command cmd;
	cmd.name = "GetChildItems";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::string ID = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<ItemCollection> itemCollection = std::make_shared<ItemCollection>(ID);
	return itemCollection;
}

void LayerCollection::removeLayerFromCollection(Layer layerHandle)
{
	Command cmd;
	cmd.name = "RemoveLayerFromCollection";
	cmd.sessionID = this->compHandle_;
	cmd.args.push_back(layerHandle.getLayerSessionID());

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

}

void LayerCollection::RemoveLayerByIndex(int index)
{
	Command cmd;
	cmd.name = "RemoveLayerByIndex";
	cmd.sessionID = this->compHandle_;
	cmd.args.push_back(index);

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

}

std::vector<std::shared_ptr<Layer>> LayerCollection::getAllLayers()
{
	try {
		std::vector<std::shared_ptr<Layer>> layers;
		Command cmd;
		cmd.name = "GetAllLayers";
		cmd.sessionID = this->compHandle_;

		auto& mqm = MessageQueueManager::getInstance();
		mqm.sendCommand(cmd);

		Response resp;
		while (!mqm.tryReceiveResponse(resp)) {
			std::this_thread::sleep_for(std::chrono::milliseconds(100));
		}

		std::vector<std::string> layerHandles = boost::get<std::vector<std::string>>(resp.args[0]);

		for (int i = 0; i < layerHandles.size(); i++) {
			std::shared_ptr<Layer> layer = std::make_shared<Layer>(layerHandles[i]);
			layers.push_back(layer);
		}
		return layers;
	}
	catch (boost::bad_get& e) {
		std::cout << e.what() << std::endl;
	}
	catch (std::exception& e) {
		std::cout << e.what() << std::endl;
	}
}

std::string LayerCollection::getCompName()
{
	Command cmd;
	cmd.name = "GetCompName";
	cmd.sessionID = this->compHandle_;

		auto& mqm = MessageQueueManager::getInstance();

	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}

std::shared_ptr<Layer> LayerCollection::addLayerToCollection(Item itemHandle, int index) {
	Command cmd;
	cmd.name = "AddLayerToCollection";
	cmd.sessionID = this->compHandle_;
	cmd.args.push_back(itemHandle.getItemHandle());
	cmd.args.push_back(index);

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::string output = boost::get<std::string>(resp.args[0]);
	std::shared_ptr<Layer> layer = std::make_shared<Layer>(output);
	return layer;
}


std::vector<std::shared_ptr<Item>> ItemCollection::getItems()
{
	std::vector<std::shared_ptr<Item>> items;
	Command cmd;
	cmd.name = "GetItems";

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::vector<std::string> itemHandles = boost::get<std::vector<std::string>>(resp.args[0]);
	std::vector<std::string> itemTypes = boost::get<std::vector<std::string>>(resp.args[1]);

	for (int i = 0; i < itemHandles.size(); i++) {
		if (itemTypes[i] == "Folder") {
			std::shared_ptr<FolderItem> folderItem = std::make_shared<FolderItem>(itemHandles[i]);
			items.push_back(folderItem);
		}
		else if (itemTypes[i] == "Footage") {
			std::shared_ptr<FootageItem> footageItem = std::make_shared<FootageItem>(itemHandles[i]);
			items.push_back(footageItem);
		}
		else if (itemTypes[i] == "Comp") {
			std::shared_ptr<CompItem> compItem = std::make_shared<CompItem>(itemHandles[i]);
			items.push_back(compItem);
		}
		return items;
	}
}

std::shared_ptr<FootageItem> FootageItem::createNew(std::string name, std::string path, int index)
{
	return std::shared_ptr<FootageItem>();
}

std::string FootageItem::getPath()
{
	Command cmd;
	cmd.name = "GetFootagePath";
	cmd.args.push_back(this->sessionID);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::string output = boost::get<std::string>(resp.args[0]);
	return output;
}

void FootageItem::replaceWithNewSource(std::string name, std::string path)
{
	Command cmd;
	cmd.name = "ReplaceFootage";
	cmd.args.push_back(this->sessionID);
	cmd.args.push_back(name);
	cmd.args.push_back(path);
	cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
	mqm.sendCommand(cmd);
}

std::shared_ptr<SolidItem> SolidItem::createNew(std::string name, float width, float height, float red, float green, float blue, float alpha, float duration, int index)
{
	return std::shared_ptr<SolidItem>();
}

std::shared_ptr<AdjustmentLayer> AdjustmentLayer::createNew(std::shared_ptr<CompItem> compH, std::string name)
{
	return std::shared_ptr<AdjustmentLayer>();
}
```

## File: PSCAE/ItemManager.h
```c
#pragma once
#include "MessageQueue.h"

class Item;
class Layer;
class LayerCollection;
class CompItem;
class FootageItem;
class FolderItem;

namespace py = pybind11;


enum LayerFlag {
    VIDEO_ACTIVE = 0x00000001,
    AUDIO_ACTIVE = 0x00000002,
    EFFECTS_ACTIVE = 0x00000004,
    MOTION_BLUR = 0x00000008,
    FRAME_BLENDING = 0x00000010,
    LOCKED = 0x00000020,
    SHY = 0x00000040,
    COLLAPSE = 0x00000080,
    AUTO_ORIENT_ROTATION = 0x00000100,
    ADJUSTMENT_LAYER = 0x00000200,
    TIME_REMAPPING = 0x00000400,
    LAYER_IS_3D = 0x00000800,
    LOOK_AT_CAMERA = 0x00001000,
    LOOK_AT_POI = 0x00002000,
    SOLO = 0x00004000,
    MARKERS_LOCKED = 0x00008000,
    NULL_LAYER = 0x00010000,
    HIDE_LOCKED_MASKS = 0x00020000,
    GUIDE_LAYER = 0x00040000,
    ADVANCED_FRAME_BLENDING = 0x00080000,
    SUBLAYERS_RENDER_SEPARATELY = 0x00100000,
    ENVIRONMENT_LAYER = 0x00200000
};


enum qualityOptions {
    BEST ,
    DRAFT ,
    WIREFRAME ,
    NONE
};

class Layer {
public:
    explicit Layer(const std::string sessionID) : sessionID(sessionID) {};

    std::string GetLayerName();
    std::string GetSourceName();
    void SetLayerName(std::string name);
    int index();
    void changeIndex(int index);
    std::shared_ptr<FootageItem> duplicate();
    float layerTime();
    float layerCompTime();
    float inPoint();
    float compInPoint();
    float duration();
    float compDuration();
    std::string getQuality();
    void setQuality(int quality);
    void deleteLayer();
    float getOffset();
    void setOffset(float offset);
    void setFlag(LayerFlag flag, bool value);
    bool getFlag(LayerFlag flag);
    std::string getLayerSessionID();
    std::shared_ptr<Item> getSource();
protected:
    std::string sessionID;
    int index_;
    std::string name_;
    std::string sourceName_;
};


class Item {
public:
    explicit Item(const std::string& sessionID) : sessionID(sessionID) {}
    virtual ~Item() = default;

    std::string getName();
    void setName(std::string name);
    float getWidth();
    float getHeight();
    std::string name;
    float getDuration();
    float getCurrentTime();
    void setCurrentTime(float time);
    void deleteItem();
    std::string getItemHandle();
    bool isSelected();
    void setSelected(bool select);
    std::string sessionID;
protected:

};


class FootageItem : public Item, public std::enable_shared_from_this<FootageItem> {
public:

    explicit FootageItem(const std::string& itemHandle) : Item(itemHandle) {}
    virtual ~FootageItem() = default;

    static std::shared_ptr<FootageItem> createNew(std::string name, std::string path = NULL, int index = -1);
    std::string getPath();
    void replaceWithNewSource(std::string name, std::string path);
};
class LayerCollection {
public:
    explicit LayerCollection(const std::string& compHandle, std::vector<std::shared_ptr<Layer>> layers)
        : compHandle_(compHandle), layers_(std::move(layers)) {}
    LayerCollection(const std::string& compHandle) : compHandle_(compHandle) {
		layers_ = LayerCollection::getAllLayers();
	}
    auto begin() const { return layers_.cbegin(); }
    auto end() const { return layers_.cend(); }
    std::size_t size() const {
        return layers_.size();
    }

    std::shared_ptr<Layer>& operator[](std::size_t index) {
        if (index >= layers_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return layers_[index];
    }

    const std::shared_ptr<Layer>& operator[](std::size_t index) const {
        if (index >= layers_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return layers_[index];
    }


    auto begin() { return layers_.begin(); }
    auto end() { return layers_.end(); }

    std::shared_ptr<Layer> addLayerToCollection(Item itemHandle, int index = -1);
    void removeLayerFromCollection(Layer layerHandle);
    void RemoveLayerByIndex(int index);

    std::vector<std::shared_ptr<Layer>> getAllLayers();

    std::string getCompName();

protected:
    std::string compHandle_;
    std::vector<std::shared_ptr<Layer>> layers_;
};



class CompItem : public Item {
public:
    explicit CompItem(const std::string& itemHandle) : Item(itemHandle) {}
    virtual ~CompItem() = default;

    std::shared_ptr<LayerCollection> getLayers();
    int NumLayers();
    float getCurrentTime();
    void setCurrentTime(float time);
    void addLayer(std::string name, std::string path = NULL, int index = -1);
    float getFrameRate();
    void setFrameRate(float frameRate);
    float getDuration();
    void setDuration(float duration);
    void setWidth(float width);
    void setHeight(float height);
    std::shared_ptr<Layer> newSolid(std::string name, float width, float height,float red, float green, float blue, float alpha,
    float duration);
    std::shared_ptr<LayerCollection> getSelectedLayers();

    static std::shared_ptr<CompItem> CreateNew(std::string name, float width, float height, float frameRate, float duration, float aspectRatio);

};

class ItemCollection {
public:
    explicit ItemCollection(const std::string& itemHandle) : sessionID(itemHandle) {
        items_ = ItemCollection::getItems();
    }

    std::vector<std::shared_ptr<Item>> getItems();

    std::size_t size() const {
        return items_.size();
    }

    std::shared_ptr<Item>& operator[](std::size_t index) {
        if (index >= items_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return items_[index];
    }

    const std::shared_ptr<Item>& operator[](std::size_t index) const {
        if (index >= items_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return items_[index];
    }


    auto begin() { return items_.begin(); }
    auto end() { return items_.end(); }
    auto begin() const { return items_.cbegin(); }
    auto end() const { return items_.cend(); }
    std::vector<std::shared_ptr<Item>> append(std::shared_ptr<Item> item) {

        return items_;
    }
    std::vector<std::shared_ptr<Item>> remove(std::shared_ptr<Item> item) {
        if (item == nullptr) {
            throw std::runtime_error("Item is null");
        }
        Item item2 = *item;
        item2.deleteItem();

        return items_;
    }

private:
    std::string sessionID;
    std::vector<std::shared_ptr<Item>> items_;
};

class FolderItem : public Item {
public:

    explicit FolderItem(const std::string& itemHandle) : Item(itemHandle) {}
    virtual ~FolderItem() = default;

    static std::shared_ptr<FolderItem> createNew(std::string name);

    std::shared_ptr<ItemCollection> ChildItems();
};

class SolidItem : public FootageItem {
public:

	explicit SolidItem(const std::string& itemHandle) : FootageItem(itemHandle) {}
	virtual ~SolidItem() = default;

    static std::shared_ptr<SolidItem> createNew(std::string name, float width, float height,
        float red, float green, float blue, float alpha, float duration, int index = -1);

    std::vector<float> GetSolidColor();
    void SetSolidColor(float red, float green, float blue, float alpha);
    void SetSolidDimensions(float width, float height);
};

class AdjustmentLayer : public Layer {
public:
	explicit AdjustmentLayer(const std::string& layerHandle) : Layer(layerHandle) {}
	virtual ~AdjustmentLayer() = default;

    static std::shared_ptr<AdjustmentLayer> createNew(std::shared_ptr<CompItem> compH, std::string name = "Adjustment Layer");
};
```

## File: PSCAE/LICENSE
```
GNU AFFERO GENERAL PUBLIC LICENSE
                       Version 3, 19 November 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

                            Preamble

  The GNU Affero General Public License is a free, copyleft license for
software and other kinds of works, specifically designed to ensure
cooperation with the community in the case of network server software.

  The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
our General Public Licenses are intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

  Developers that use our General Public Licenses protect your rights
with two steps: (1) assert copyright on the software, and (2) offer
you this License which gives you legal permission to copy, distribute
and/or modify the software.

  A secondary benefit of defending all users' freedom is that
improvements made in alternate versions of the program, if they
receive widespread use, become available for other developers to
incorporate.  Many developers of free software are heartened and
encouraged by the resulting cooperation.  However, in the case of
software used on network servers, this result may fail to come about.
The GNU General Public License permits making a modified version and
letting the public access it on a server without ever releasing its
source code to the public.

  The GNU Affero General Public License is designed specifically to
ensure that, in such cases, the modified source code becomes available
to the community.  It requires the operator of a network server to
provide the source code of the modified version running there to the
users of that server.  Therefore, public use of a modified version, on
a publicly accessible server, gives the public access to the source
code of the modified version.

  An older license, called the Affero General Public License and
published by Affero, was designed to accomplish similar goals.  This is
a different license, not a version of the Affero GPL, but Affero has
released a new version of the Affero GPL which permits relicensing under
this license.

  The precise terms and conditions for copying, distribution and
modification follow.

                       TERMS AND CONDITIONS

  0. Definitions.

  "This License" refers to version 3 of the GNU Affero General Public License.

  "Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

  "The Program" refers to any copyrightable work licensed under this
License.  Each licensee is addressed as "you".  "Licensees" and
"recipients" may be individuals or organizations.

  To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy.  The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

  A "covered work" means either the unmodified Program or a work based
on the Program.

  To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy.  Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

  To "convey" a work means any kind of propagation that enables other
parties to make or receive copies.  Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

  An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License.  If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

  1. Source Code.

  The "source code" for a work means the preferred form of the work
for making modifications to it.  "Object code" means any non-source
form of a work.

  A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

  The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form.  A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

  The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities.  However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work.  For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

  The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

  The Corresponding Source for a work in source code form is that
same work.

  2. Basic Permissions.

  All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met.  This License explicitly affirms your unlimited
permission to run the unmodified Program.  The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work.  This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

  You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force.  You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright.  Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

  Conveying under any other circumstances is permitted solely under
the conditions stated below.  Sublicensing is not allowed; section 10
makes it unnecessary.

  3. Protecting Users' Legal Rights From Anti-Circumvention Law.

  No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

  When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

  4. Conveying Verbatim Copies.

  You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

  You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

  5. Conveying Modified Source Versions.

  You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

    a) The work must carry prominent notices stating that you modified
    it, and giving a relevant date.

    b) The work must carry prominent notices stating that it is
    released under this License and any conditions added under section
    7.  This requirement modifies the requirement in section 4 to
    "keep intact all notices".

    c) You must license the entire work, as a whole, under this
    License to anyone who comes into possession of a copy.  This
    License will therefore apply, along with any applicable section 7
    additional terms, to the whole of the work, and all its parts,
    regardless of how they are packaged.  This License gives no
    permission to license the work in any other way, but it does not
    invalidate such permission if you have separately received it.

    d) If the work has interactive user interfaces, each must display
    Appropriate Legal Notices; however, if the Program has interactive
    interfaces that do not display Appropriate Legal Notices, your
    work need not make them do so.

  A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit.  Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

  6. Conveying Non-Source Forms.

  You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

    a) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by the
    Corresponding Source fixed on a durable physical medium
    customarily used for software interchange.

    b) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by a
    written offer, valid for at least three years and valid for as
    long as you offer spare parts or customer support for that product
    model, to give anyone who possesses the object code either (1) a
    copy of the Corresponding Source for all the software in the
    product that is covered by this License, on a durable physical
    medium customarily used for software interchange, for a price no
    more than your reasonable cost of physically performing this
    conveying of source, or (2) access to copy the
    Corresponding Source from a network server at no charge.

    c) Convey individual copies of the object code with a copy of the
    written offer to provide the Corresponding Source.  This
    alternative is allowed only occasionally and noncommercially, and
    only if you received the object code with such an offer, in accord
    with subsection 6b.

    d) Convey the object code by offering access from a designated
    place (gratis or for a charge), and offer equivalent access to the
    Corresponding Source in the same way through the same place at no
    further charge.  You need not require recipients to copy the
    Corresponding Source along with the object code.  If the place to
    copy the object code is a network server, the Corresponding Source
    may be on a different server (operated by you or a third party)
    that supports equivalent copying facilities, provided you maintain
    clear directions next to the object code saying where to find the
    Corresponding Source.  Regardless of what server hosts the
    Corresponding Source, you remain obligated to ensure that it is
    available for as long as needed to satisfy these requirements.

    e) Convey the object code using peer-to-peer transmission, provided
    you inform other peers where the object code and Corresponding
    Source of the work are being offered to the general public at no
    charge under subsection 6d.

  A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

  A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling.  In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage.  For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product.  A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

  "Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source.  The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

  If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information.  But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

  The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed.  Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

  Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

  7. Additional Terms.

  "Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law.  If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

  When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it.  (Additional permissions may be written to require their own
removal in certain cases when you modify the work.)  You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

  Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

    a) Disclaiming warranty or limiting liability differently from the
    terms of sections 15 and 16 of this License; or

    b) Requiring preservation of specified reasonable legal notices or
    author attributions in that material or in the Appropriate Legal
    Notices displayed by works containing it; or

    c) Prohibiting misrepresentation of the origin of that material, or
    requiring that modified versions of such material be marked in
    reasonable ways as different from the original version; or

    d) Limiting the use for publicity purposes of names of licensors or
    authors of the material; or

    e) Declining to grant rights under trademark law for use of some
    trade names, trademarks, or service marks; or

    f) Requiring indemnification of licensors and authors of that
    material by anyone who conveys the material (or modified versions of
    it) with contractual assumptions of liability to the recipient, for
    any liability that these contractual assumptions directly impose on
    those licensors and authors.

  All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10.  If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term.  If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

  If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

  Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

  8. Termination.

  You may not propagate or modify a covered work except as expressly
provided under this License.  Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

  However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

  Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

  Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License.  If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

  9. Acceptance Not Required for Having Copies.

  You are not required to accept this License in order to receive or
run a copy of the Program.  Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance.  However,
nothing other than this License grants you permission to propagate or
modify any covered work.  These actions infringe copyright if you do
not accept this License.  Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

  10. Automatic Licensing of Downstream Recipients.

  Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License.  You are not responsible
for enforcing compliance by third parties with this License.

  An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations.  If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

  You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License.  For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

  11. Patents.

  A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based.  The
work thus licensed is called the contributor's "contributor version".

  A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version.  For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

  Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

  In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement).  To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

  If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients.  "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

  If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

  A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License.  You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

  Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

  12. No Surrender of Others' Freedom.

  If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all.  For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

  13. Remote Network Interaction; Use with the GNU General Public License.

  Notwithstanding any other provision of this License, if you modify the
Program, your modified version must prominently offer all users
interacting with it remotely through a computer network (if your version
supports such interaction) an opportunity to receive the Corresponding
Source of your version by providing access to the Corresponding Source
from a network server at no charge, through some standard or customary
means of facilitating copying of software.  This Corresponding Source
shall include the Corresponding Source for any work covered by version 3
of the GNU General Public License that is incorporated pursuant to the
following paragraph.

  Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU General Public License into a single
combined work, and to convey the resulting work.  The terms of this
License will continue to apply to the part which is the covered work,
but the work with which it is combined will remain governed by version
3 of the GNU General Public License.

  14. Revised Versions of this License.

  The Free Software Foundation may publish revised and/or new versions of
the GNU Affero General Public License from time to time.  Such new versions
will be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

  Each version is given a distinguishing version number.  If the
Program specifies that a certain numbered version of the GNU Affero General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation.  If the Program does not specify a version number of the
GNU Affero General Public License, you may choose any version ever published
by the Free Software Foundation.

  If the Program specifies that a proxy can decide which future
versions of the GNU Affero General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

  Later license versions may give you additional or different
permissions.  However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

  15. Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

  16. Limitation of Liability.

  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

  17. Interpretation of Sections 15 and 16.

  If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

                     END OF TERMS AND CONDITIONS

            How to Apply These Terms to Your New Programs

  If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

  To do so, attach the following notices to the program.  It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

  If your software can interact with users remotely through a computer
network, you should also make sure that it provides a way for users to
get its source.  For example, if your program is a web application, its
interface could display a "Source" link that leads users to an archive
of the code.  There are many ways you could offer source, and different
solutions will be better for different programs; see section 13 for the
specific requirements.

  You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU AGPL, see
<https://www.gnu.org/licenses/>.
```

## File: PSCAE/MessageQueue.cpp
```cpp
#include "pch.h"
#include "MessageQueue.h"

std::string createUUID() {
    GUID guid;
    HRESULT result = CoCreateGuid(&guid);

    if (FAILED(result)) {

        return "";
    }

    char buffer[39];
    snprintf(buffer, sizeof(buffer),
        "{%08lX-%04X-%04X-%02X%02X-%02X%02X%02X%02X%02X%02X}",
        guid.Data1, guid.Data2, guid.Data3,
        guid.Data4[0], guid.Data4[1], guid.Data4[2],
        guid.Data4[3], guid.Data4[4], guid.Data4[5],
        guid.Data4[6], guid.Data4[7]);

    return std::string(buffer);
}
```

## File: PSCAE/MessageQueue.h
```c
#pragma once
#include <boost/interprocess/ipc/message_queue.hpp>
#include <boost/serialization/serialization.hpp>
#include <boost/serialization/export.hpp>
#include <boost/archive/text_oarchive.hpp>
#include <boost/archive/text_iarchive.hpp>
#include <boost/variant/variant.hpp>
#include <boost/variant/get.hpp>
#include <boost/serialization/vector.hpp>
#include <boost/serialization/variant.hpp>
#include <boost/interprocess/sync/named_mutex.hpp>
#include <boost/interprocess/sync/named_condition.hpp>

#include <boost/date_time/posix_time/posix_time.hpp>
#include <iostream>
#include <thread>
#include <sstream>
#include <string>
#include "rpc.h"
#include "objbase.h"


std::string createUUID();

enum class Commands {
    reportInfo,
    beginUndoGroup,
    endUndoGroup,
    getProject

};

typedef boost::variant<int, float, std::string, bool, std::vector<std::string>> CommandArg;
typedef std::vector<CommandArg> CommandArgs;


struct Command {
    std::string sessionID = "0";
    std::string name = "name";
    CommandArgs args;

    template <class Archive>
    void serialize(Archive& ar, const unsigned int version) {
        ar& sessionID;
        ar& name;
        ar& args;
    }
};

struct Response {
    std::string sessionID = "0";
    CommandArgs args;

    template<class Archive>
    void serialize(Archive& ar, const unsigned int version) {
        ar& sessionID;
        ar& args;
    }
};


class MessageQueueManager {
public:

    MessageQueueManager(const MessageQueueManager&) = delete;
    MessageQueueManager& operator=(const MessageQueueManager&) = delete;


    static MessageQueueManager& getInstance() {
        static MessageQueueManager instance;
        return instance;
    }

    void sendCommand(Command command) {
        std::stringstream ss;
        boost::archive::text_oarchive oa(ss);
        oa << command;
        std::string serializedCommand = ss.str();
        commandQueue->send(serializedCommand.c_str(), serializedCommand.size(), 0);
    }

    bool tryReceiveResponse(Response& response) {
		boost::interprocess::message_queue::size_type recvd_size;
		unsigned int priority;
		std::size_t max_msg_size = responseQueue->get_max_msg_size();
		std::vector<char> buffer(max_msg_size);
		if (responseQueue->timed_receive(buffer.data(), buffer.size(), recvd_size, priority,
			boost::posix_time::microsec_clock::universal_time() +
			boost::posix_time::milliseconds(100))) {
			std::string serializedResponse(buffer.begin(), buffer.begin() + recvd_size);
			std::stringstream ss(serializedResponse);
			boost::archive::text_iarchive ia(ss);
			ia >> response;
			return true;
		}
		return false;
	}


private:
    MessageQueueManager() {

        commandQueue = std::make_unique<boost::interprocess::message_queue>(
            boost::interprocess::open_or_create, "PyC21", 100, 1024);
        responseQueue = std::make_unique<boost::interprocess::message_queue>(
            boost::interprocess::open_or_create, "PyR21", 100, 1024);
    }

    std::unique_ptr<boost::interprocess::message_queue> commandQueue;
    std::unique_ptr<boost::interprocess::message_queue> responseQueue;

};
```

## File: PSCAE/pch.cpp
```cpp
#include "pch.h"
```

## File: PSCAE/pch.h
```c
#ifndef PCH_H
#define PCH_H

#include <filesystem>

#include "framework.h"
#include <string>
#include <vector>
#include <map>
#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include <pybind11/stl_bind.h>
#include <pybind11/functional.h>
#include <boost/interprocess/ipc/message_queue.hpp>
#include <boost/serialization/serialization.hpp>
#include <boost/serialization/export.hpp>
#include <boost/archive/text_oarchive.hpp>
#include <boost/archive/text_iarchive.hpp>
#include <boost/variant/variant.hpp>
#include <boost/variant/get.hpp>
#include <boost/serialization/variant.hpp>
#include <boost/serialization/vector.hpp>

namespace py = pybind11;

#endif
```

## File: PSCAE/Project.cpp
```cpp
#include "pch.h"
#include "Project.h"



std::shared_ptr<Item> Project::ActiveItem() {
	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "ActiveItem";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);

		auto& mqm = MessageQueueManager::getInstance();

	mqm.sendCommand(cmd);
	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}

	std::string ID = resp.sessionID;

	std::string itemIDH = boost::get<std::string>(resp.args[0]);
	std::string type = boost::get<std::string>(resp.args[1]);

	if (type == "Folder") {
		std::shared_ptr<FolderItem> item = std::make_shared<FolderItem>(itemIDH);
		return item;
	}
	else if (type == "Footage") {
		std::shared_ptr<FootageItem> item = std::make_shared<FootageItem>(itemIDH);
		return item;
	}
	else if (type == "Comp") {
		std::shared_ptr<CompItem> item = std::make_shared<CompItem>(itemIDH);
		return item;
	}
	else {
		std::shared_ptr<Item> item = std::make_shared<Item>(itemIDH);
		return item;
	}
}

std::shared_ptr<Layer> Project::GetActiveLayer()
{
	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "GetActiveLayer";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);

		auto& mqm = MessageQueueManager::getInstance();

	mqm.sendCommand(cmd);
	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	std::string ID = resp.sessionID;


	std::string itemIDH = boost::get<std::string>(resp.args[0]);


	std::shared_ptr<Layer> layer = std::make_shared<Layer>(itemIDH);
	return layer;

}

std::string Project::getName()
{
Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "GetProjectName";

		auto& mqm = MessageQueueManager::getInstance();

	mqm.sendCommand(cmd);
	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	std::string ID = resp.sessionID;

	std::string name = boost::get<std::string>(resp.args[0]);

	return name;
}

std::string Project::getPath()
{
Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "GetProjectPath";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);

		auto& mqm = MessageQueueManager::getInstance();

	mqm.sendCommand(cmd);
	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	std::string ID = resp.sessionID;

	std::string path = boost::get<std::string>(resp.args[0]);

	return path;
}

void Project::saveAs(std::string path)
{
	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "SaveProjectAs";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);
	cmd.args.push_back(path);

		auto& mqm = MessageQueueManager::getInstance();

	mqm.sendCommand(cmd);
}


std::shared_ptr<ProjectCollection> Project::ChildItems()
{
Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "getChildItems";

	auto& mqm = MessageQueueManager::getInstance();

	mqm.sendCommand(cmd);
	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	std::string ID = resp.sessionID;

	std::string itemIDH = boost::get<std::string>(resp.args[0]);

	std::shared_ptr<ProjectCollection> collection = std::make_shared<ProjectCollection>(itemIDH);
	return collection;

}

std::shared_ptr<ProjectCollection> Project::SelectedItems()
{
	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "getSelectedItems";
	std::string itemID = createUUID();
	cmd.args.push_back(itemID);

		auto& mqm = MessageQueueManager::getInstance();

	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	std::string ID = resp.sessionID;

	std::string itemIDH = boost::get<std::string>(resp.args[0]);


	std::shared_ptr<ProjectCollection> collection = std::make_shared<ProjectCollection>(itemID);
	return collection;
}

std::vector<std::shared_ptr<Item>> ProjectCollection::getItems()
{
	try {
		std::vector<std::shared_ptr<Item>> Items;
		Command cmd;
		cmd.name = "getItems";
		cmd.sessionID = this->sessionID;

		auto& mqm = MessageQueueManager::getInstance();
		mqm.sendCommand(cmd);

		Response resp;
		while (!mqm.tryReceiveResponse(resp)) {
			std::this_thread::sleep_for(std::chrono::milliseconds(100));
		}

		CommandArg arg = resp.args[0];
		CommandArg arg2 = resp.args[1];

		std::vector<std::string> itemHandles = boost::get<std::vector<std::string>>(arg);
		std::vector<std::string> itemTypes = boost::get<std::vector<std::string>>(arg2);

		for (int i = 0; i < itemHandles.size(); i++) {
			if (itemTypes[i] == "Folder") {
				std::shared_ptr<FolderItem> item = std::make_shared<FolderItem>(itemHandles[i]);
				Items.push_back(item);
			}
			else if (itemTypes[i] == "Footage") {
				std::shared_ptr<FootageItem> item = std::make_shared<FootageItem>(itemHandles[i]);
				Items.push_back(item);
			}
			else if (itemTypes[i] == "Comp") {
				std::shared_ptr<CompItem> item = std::make_shared<CompItem>(itemHandles[i]);
				Items.push_back(item);
			}
			else {
				std::shared_ptr<Item> item = std::make_shared<Item>(itemHandles[i]);
				Items.push_back(item);
			}
		}
		return Items;
	}
	catch (boost::bad_get& e) {
		std::cout << e.what() << std::endl;
	}
	catch (std::exception& e) {
		std::cout << e.what() << std::endl;
	}
}

std::vector<std::shared_ptr<Item>> ProjectCollection::append(std::shared_ptr<Item> item)
{
	std::vector<std::shared_ptr<Item>> items;
	Command cmd;
	cmd.sessionID = this->sessionID;
	cmd.name = "appendItem";
	cmd.args.push_back(item->sessionID);
		auto& mqm = MessageQueueManager::getInstance();

	mqm.sendCommand(cmd);

	Response resp;
	while (!mqm.tryReceiveResponse(resp)) {
		std::this_thread::sleep_for(std::chrono::milliseconds(100));
	}
	std::string ID = resp.sessionID;


	CommandArg arg = resp.args[0];
	CommandArg arg2 = resp.args[1];

	if (boost::get<std::vector<std::string>>(&arg) != nullptr) {

		std::vector<std::string> itemIDs = boost::get<std::vector<std::string>>(arg);

		if (boost::get<std::vector<std::string>>(&arg2) != nullptr) {

			std::vector<std::string> itemTypes = boost::get<std::vector<std::string>>(arg2);
			for (int i = 0; i < itemIDs.size(); i++) {
				std::string itemIDH = itemIDs[i];
				std::string itemType = itemTypes[i];
				if (itemType == "FolderItem") {
					std::shared_ptr<FolderItem> item = std::make_shared<FolderItem>(itemIDH);
					items.push_back(item);
				}
				else if (itemType == "FootageItem") {
					std::shared_ptr<FootageItem> item = std::make_shared<FootageItem>(itemIDH);
					items.push_back(item);
				}
				else if (itemType == "CompItem") {
					std::shared_ptr<CompItem> item = std::make_shared<CompItem>(itemIDH);
					items.push_back(item);
				}
				else {
					std::shared_ptr<Item> item = std::make_shared<Item>(itemIDH);
					items.push_back(item);
				}
			}
			return items;
		}
	}
	else {

		std::string itemIDH = boost::get<std::string>(arg);
		std::string itemType = boost::get<std::string>(arg2);
		if (itemType == "FolderItem") {
			std::shared_ptr<FolderItem> item = std::make_shared<FolderItem>(itemIDH);
			items.push_back(item);
		}
		else if (itemType == "FootageItem") {
			std::shared_ptr<FootageItem> item = std::make_shared<FootageItem>(itemIDH);
			items.push_back(item);
		}
		else if (itemType == "CompItem") {
			std::shared_ptr<CompItem> item = std::make_shared<CompItem>(itemIDH);
			items.push_back(item);
		}
		else {
			std::shared_ptr<Item> item = std::make_shared<Item>(itemIDH);
		items.push_back(item);
	}
		return items;
	}
}
```

## File: PSCAE/Project.h
```c
#pragma once
#include "MessageQueue.h"
#include "ItemManager.h"



class ProjectCollection {
public:
    explicit ProjectCollection(const std::string sessionID) : sessionID(sessionID) {
        items_ = ProjectCollection::getItems();
    }

    std::vector<std::shared_ptr<Item>> getItems();

    std::size_t size() const {
        return items_.size();
    }

    std::shared_ptr<Item>& operator[](std::size_t index) {
        if (index >= items_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return items_[index];
    }

    const std::shared_ptr<Item>& operator[](std::size_t index) const {
        if (index >= items_.size()) {
            throw std::out_of_range("Index out of range");
        }
        return items_[index];
    }


    auto begin() { return items_.begin(); }
    auto end() { return items_.end(); }
    auto begin() const { return items_.cbegin(); }
    auto end() const { return items_.cend(); }

    std::vector<std::shared_ptr<Item>> append(std::shared_ptr<Item> item);

    std::vector<std::shared_ptr<Item>> remove(std::shared_ptr<Item> item) {
        if (item == nullptr) {
            throw std::runtime_error("Item is null");
        }
        Item item2 = *item;
        item2.deleteItem();
	}

private:
    std::string sessionID;
    std::vector<std::shared_ptr<Item>> items_;
};


class Project {
public:
    Project() = default;
    Project(std::string sessionID) : sessionID(sessionID) {}

    std::shared_ptr<Item> ActiveItem();
    std::shared_ptr<Layer> GetActiveLayer();
    std::string getName();
    std::string getPath();
    void saveAs(std::string path);
    std::shared_ptr<ProjectCollection> ChildItems();
    std::shared_ptr<ProjectCollection> SelectedItems();
private:
    std::shared_ptr<Item> activeItem;
    std::string sessionID;
};
```

## File: PSCAE/PSCAE.vcxproj
```
<?xml version="1.0" encoding="utf-8"?>
<Project DefaultTargets="Build" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <ItemGroup Label="ProjectConfigurations">
    <ProjectConfiguration Include="Debug|Win32">
      <Configuration>Debug</Configuration>
      <Platform>Win32</Platform>
    </ProjectConfiguration>
    <ProjectConfiguration Include="Release|Win32">
      <Configuration>Release</Configuration>
      <Platform>Win32</Platform>
    </ProjectConfiguration>
    <ProjectConfiguration Include="Debug|x64">
      <Configuration>Debug</Configuration>
      <Platform>x64</Platform>
    </ProjectConfiguration>
    <ProjectConfiguration Include="Release|x64">
      <Configuration>Release</Configuration>
      <Platform>x64</Platform>
    </ProjectConfiguration>
  </ItemGroup>
  <PropertyGroup Label="Globals">
    <VCProjectVersion>16.0</VCProjectVersion>
    <Keyword>Win32Proj</Keyword>
    <ProjectGuid>{ac5aacd0-2b74-483f-ae62-c8c4dd9baafd}</ProjectGuid>
    <RootNamespace>PSCAE</RootNamespace>
    <WindowsTargetPlatformVersion>10.0</WindowsTargetPlatformVersion>
  </PropertyGroup>
  <Import Project="$(VCTargetsPath)\Microsoft.Cpp.Default.props" />
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <UseDebugLibraries>true</UseDebugLibraries>
    <PlatformToolset>v143</PlatformToolset>
    <CharacterSet>Unicode</CharacterSet>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|Win32'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <UseDebugLibraries>false</UseDebugLibraries>
    <PlatformToolset>v143</PlatformToolset>
    <WholeProgramOptimization>true</WholeProgramOptimization>
    <CharacterSet>Unicode</CharacterSet>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <UseDebugLibraries>true</UseDebugLibraries>
    <PlatformToolset>v143</PlatformToolset>
    <CharacterSet>Unicode</CharacterSet>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <UseDebugLibraries>false</UseDebugLibraries>
    <PlatformToolset>v143</PlatformToolset>
    <WholeProgramOptimization>true</WholeProgramOptimization>
    <CharacterSet>Unicode</CharacterSet>
  </PropertyGroup>
  <Import Project="$(VCTargetsPath)\Microsoft.Cpp.props" />
  <ImportGroup Label="ExtensionSettings">
  </ImportGroup>
  <ImportGroup Label="Shared">
  </ImportGroup>
  <ImportGroup Label="PropertySheets" Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
  </ImportGroup>
  <ImportGroup Label="PropertySheets" Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
  </ImportGroup>
  <ImportGroup Label="PropertySheets" Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
  </ImportGroup>
  <ImportGroup Label="PropertySheets" Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
  </ImportGroup>
  <PropertyGroup Label="UserMacros" />
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <IncludePath>C:\Users\tjerf\Downloads\SDKNEW\AfterEffectsSDK\Examples\Headers\SP;C:\Users\tjerf\Downloads\SDKNEW\AfterEffectsSDK\Examples\Util;C:\Users\tjerf\Downloads\SDKNEW\AfterEffectsSDK\Examples\Headers;C:\Program Files\Python311\include;$(IncludePath)</IncludePath>
    <LibraryPath>C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib;C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib;C:\Program Files\Python311\libs;$(LibraryPath)</LibraryPath>
    <TargetExt>.pyd</TargetExt>
  </PropertyGroup>
  <PropertyGroup Label="Vcpkg" Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <VcpkgInstalledDir>..\..\..\..\vcpkg\installed</VcpkgInstalledDir>
    <VcpkgUseStatic>true</VcpkgUseStatic>
    <VcpkgConfiguration>Debug</VcpkgConfiguration>
  </PropertyGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">
    <ClCompile>
      <WarningLevel>Level3</WarningLevel>
      <SDLCheck>true</SDLCheck>
      <PreprocessorDefinitions>WIN32;_DEBUG;PSCAE_EXPORTS;_WINDOWS;_USRDLL;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <ConformanceMode>true</ConformanceMode>
      <PrecompiledHeader>Use</PrecompiledHeader>
      <PrecompiledHeaderFile>pch.h</PrecompiledHeaderFile>
    </ClCompile>
    <Link>
      <SubSystem>Windows</SubSystem>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <EnableUAC>false</EnableUAC>
    </Link>
  </ItemDefinitionGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">
    <ClCompile>
      <WarningLevel>Level3</WarningLevel>
      <FunctionLevelLinking>true</FunctionLevelLinking>
      <IntrinsicFunctions>true</IntrinsicFunctions>
      <SDLCheck>true</SDLCheck>
      <PreprocessorDefinitions>WIN32;NDEBUG;PSCAE_EXPORTS;_WINDOWS;_USRDLL;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <ConformanceMode>true</ConformanceMode>
      <PrecompiledHeader>Use</PrecompiledHeader>
      <PrecompiledHeaderFile>pch.h</PrecompiledHeaderFile>
    </ClCompile>
    <Link>
      <SubSystem>Windows</SubSystem>
      <EnableCOMDATFolding>true</EnableCOMDATFolding>
      <OptimizeReferences>true</OptimizeReferences>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <EnableUAC>false</EnableUAC>
    </Link>
  </ItemDefinitionGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <ClCompile>
      <WarningLevel>Level2</WarningLevel>
      <SDLCheck>true</SDLCheck>
      <PreprocessorDefinitions>_DEBUG;PSCAE_EXPORTS;_WINDOWS;_USRDLL;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <ConformanceMode>true</ConformanceMode>
      <PrecompiledHeader>Use</PrecompiledHeader>
      <PrecompiledHeaderFile>pch.h</PrecompiledHeaderFile>
      <AdditionalIncludeDirectories>C:\Users\tjerf\vcpkg\installed\x64-windows-static\include;C:\Users\tjerf\Downloads\SDKNEW\AfterEffectsSDK\Examples\Headers\SP;C:\Users\tjerf\Downloads\SDKNEW\AfterEffectsSDK\Examples\Util;C:\Users\tjerf\Downloads\SDKNEW\AfterEffectsSDK\Examples\Headers;C:\Program Files\Python311\include</AdditionalIncludeDirectories>
      <LanguageStandard>stdcpp17</LanguageStandard>
      <RuntimeLibrary>MultiThreadedDebug</RuntimeLibrary>
    </ClCompile>
    <Link>
      <SubSystem>Windows</SubSystem>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <EnableUAC>false</EnableUAC>
      <AdditionalLibraryDirectories>C:\Program Files\Python311\libs;C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib;C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib</AdditionalLibraryDirectories>
      <AdditionalDependencies>"C:\Program Files\Python311\libs\python311.lib";"C:\Program Files\Python311\libs\python311_d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_log_setup-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_log-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_math_c99f-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_math_c99l-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_math_c99-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_math_tr1f-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_math_tr1l-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_math_tr1-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_nowide-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_program_options-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_python311-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_random-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_regex-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_serialization-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_stacktrace_noop-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_stacktrace_windbg_cached-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_stacktrace_windbg-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_system-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_thread-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_timer-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_type_erasure-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_unit_test_framework-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_url-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_wave-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_wserialization-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\bz2d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libexpatdMT.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\lzma.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\python311_d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\zlibd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\zstd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_atomic-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_chrono-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_container-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_context-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_contract-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_coroutine-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_date_time-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_exception-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_fiber-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_filesystem-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_graph-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_iostreams-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_json-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\boost_locale-vc140-mt-gd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_thread-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_timer-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_type_erasure-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_unit_test_framework-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_url-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_wave-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_wserialization-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\bz2.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\libexpatMT.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\lzma.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\python311.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\zlib.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\zstd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_atomic-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_chrono-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_container-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_context-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_contract-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_coroutine-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_date_time-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_exception-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_fiber-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_filesystem-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_graph-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_iostreams-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_json-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_locale-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_log_setup-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_log-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_math_c99f-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_math_c99l-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_math_c99-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_math_tr1f-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_math_tr1l-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_math_tr1-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_nowide-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_program_options-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_python311-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_random-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_regex-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_serialization-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_stacktrace_noop-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_stacktrace_windbg_cached-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_stacktrace_windbg-vc140-mt.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib\boost_system-vc140-mt.lib";%(AdditionalDependencies)</AdditionalDependencies>
    </Link>
  </ItemDefinitionGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <ClCompile>
      <WarningLevel>Level3</WarningLevel>
      <FunctionLevelLinking>true</FunctionLevelLinking>
      <IntrinsicFunctions>true</IntrinsicFunctions>
      <SDLCheck>true</SDLCheck>
      <PreprocessorDefinitions>NDEBUG;PSCAE_EXPORTS;_WINDOWS;_USRDLL;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <ConformanceMode>true</ConformanceMode>
      <PrecompiledHeader>Use</PrecompiledHeader>
      <PrecompiledHeaderFile>pch.h</PrecompiledHeaderFile>
    </ClCompile>
    <Link>
      <SubSystem>Windows</SubSystem>
      <EnableCOMDATFolding>true</EnableCOMDATFolding>
      <OptimizeReferences>true</OptimizeReferences>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <EnableUAC>false</EnableUAC>
    </Link>
  </ItemDefinitionGroup>
  <ItemGroup>
    <ClInclude Include="App.h" />
    <ClInclude Include="framework.h" />
    <ClInclude Include="ItemManager.h" />
    <ClInclude Include="MessageQueue.h" />
    <ClInclude Include="pch.h" />
    <ClInclude Include="Project.h" />
    <ClInclude Include="PyCore.h" />
  </ItemGroup>
  <ItemGroup>
    <ClCompile Include="App.cpp" />
    <ClCompile Include="ItemManager.cpp" />
    <ClCompile Include="MessageQueue.cpp" />
    <ClCompile Include="pch.cpp">
      <PrecompiledHeader Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">Create</PrecompiledHeader>
      <PrecompiledHeader Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">Create</PrecompiledHeader>
      <PrecompiledHeader Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">Create</PrecompiledHeader>
      <PrecompiledHeader Condition="'$(Configuration)|$(Platform)'=='Release|x64'">Create</PrecompiledHeader>
    </ClCompile>
    <ClCompile Include="Project.cpp" />
    <ClCompile Include="PyCore.cpp" />
    <ClCompile Include="Source.cpp" />
  </ItemGroup>
  <Import Project="$(VCTargetsPath)\Microsoft.Cpp.targets" />
  <ImportGroup Label="ExtensionTargets">
  </ImportGroup>
</Project>
```

## File: PSCAE/PSCAE.vcxproj.filters
```
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <ItemGroup>
    <Filter Include="Source Files">
      <UniqueIdentifier>{4FC737F1-C7A5-4376-A066-2A32D752A2FF}</UniqueIdentifier>
      <Extensions>cpp;c;cc;cxx;c++;cppm;ixx;def;odl;idl;hpj;bat;asm;asmx</Extensions>
    </Filter>
    <Filter Include="Header Files">
      <UniqueIdentifier>{93995380-89BD-4b04-88EB-625FBE52EBFB}</UniqueIdentifier>
      <Extensions>h;hh;hpp;hxx;h++;hm;inl;inc;ipp;xsd</Extensions>
    </Filter>
    <Filter Include="Resource Files">
      <UniqueIdentifier>{67DA6AB6-F800-4c08-8B7A-83BB121AAD01}</UniqueIdentifier>
      <Extensions>rc;ico;cur;bmp;dlg;rc2;rct;bin;rgs;gif;jpg;jpeg;jpe;resx;tiff;tif;png;wav;mfcribbon-ms</Extensions>
    </Filter>
  </ItemGroup>
  <ItemGroup>
    <ClInclude Include="framework.h">
      <Filter>Header Files</Filter>
    </ClInclude>
    <ClInclude Include="pch.h">
      <Filter>Header Files</Filter>
    </ClInclude>
    <ClInclude Include="MessageQueue.h">
      <Filter>Header Files</Filter>
    </ClInclude>
    <ClInclude Include="App.h">
      <Filter>Header Files</Filter>
    </ClInclude>
    <ClInclude Include="ItemManager.h">
      <Filter>Header Files</Filter>
    </ClInclude>
    <ClInclude Include="Project.h">
      <Filter>Header Files</Filter>
    </ClInclude>
    <ClInclude Include="PyCore.h">
      <Filter>Header Files</Filter>
    </ClInclude>
  </ItemGroup>
  <ItemGroup>
    <ClCompile Include="pch.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
    <ClCompile Include="Source.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
    <ClCompile Include="MessageQueue.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
    <ClCompile Include="App.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
    <ClCompile Include="ItemManager.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
    <ClCompile Include="Project.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
    <ClCompile Include="PyCore.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
  </ItemGroup>
</Project>
```

## File: PSCAE/PyCore.cpp
```cpp
#include "pch.h"
#include "PyCore.h"
#include <filesystem>










void Manifest::validate()
{

    this->_validate_versions();
    this->_validate_paths();
    this->_validate_dependencies();
}

void Manifest::load()
{

    this->_load_main();
}

void Manifest::_validate_versions()
{

    auto& valid_versions = this->_validVersions;
    auto& AE_VERS = this->AE_VERS;


    for (auto& version : AE_VERS) {
        if (std::find(valid_versions.begin(), valid_versions.end(), version) == valid_versions.end()) {
            throw std::invalid_argument("Invalid AE version: " + version);
        }
    }
}

void Manifest::_validate_paths()
{

    auto& entry = this->_entry;

    if (!std::filesystem::exists(entry)) {
        throw std::invalid_argument("Missing entry script: " + entry);
    }

}

void Manifest::_validate_dependencies()
{

    auto& dependencies = this->_dependencies;
    for (auto& dependency : dependencies) {
        try {
            py::module_::import(dependency.c_str());
        }
        catch (py::error_already_set& e) {
            throw std::invalid_argument("Missing dependency: " + dependency);
        }
    }
}

void Manifest::_load_main()
{

    auto& entry = this->_entry;


    py::module_ main = py::module_::import(entry.c_str());
    this->_main = main;

}

void bindLayerEnum(py::module_& m)
{
    py::enum_<qualityOptions>(m, "Quality")
        .value("BEST", qualityOptions::BEST)
        .value("DRAFT", qualityOptions::DRAFT)
        .value("WIREFRAME", qualityOptions::WIREFRAME)
        .value("NONE", qualityOptions::NONE)
        .export_values();

    py::enum_<LayerFlag>(m, "LayerFlag")
        .value("VIDEO_ACTIVE", LayerFlag::VIDEO_ACTIVE)
        .value("AUDIO_ACTIVE", LayerFlag::AUDIO_ACTIVE)
        .value("EFFECTS_ACTIVE", LayerFlag::EFFECTS_ACTIVE)
        .value("MOTION_BLUR", LayerFlag::MOTION_BLUR)
        .value("FRAME_BLENDING", LayerFlag::FRAME_BLENDING)
        .value("LOCKED", LayerFlag::LOCKED)
        .value("SHY", LayerFlag::SHY)
        .value("COLLAPSE", LayerFlag::COLLAPSE)
        .value("AUTO_ORIENT_ROTATION", LayerFlag::AUTO_ORIENT_ROTATION)
        .value("ADJUSTMENT_LAYER", LayerFlag::ADJUSTMENT_LAYER)
        .value("TIME_REMAPPING", LayerFlag::TIME_REMAPPING)
        .value("LAYER_IS_3D", LayerFlag::LAYER_IS_3D)
        .value("LOOK_AT_CAMERA", LayerFlag::LOOK_AT_CAMERA)
        .value("LOOK_AT_POI", LayerFlag::LOOK_AT_POI)
        .value("SOLO", LayerFlag::SOLO)
        .value("MARKERS_LOCKED", LayerFlag::MARKERS_LOCKED)
        .value("NULL_LAYER", LayerFlag::NULL_LAYER)
        .value("HIDE_LOCKED_MASKS", LayerFlag::HIDE_LOCKED_MASKS)
        .value("GUIDE_LAYER", LayerFlag::GUIDE_LAYER)
        .value("ADVANCED_FRAME_BLENDING", LayerFlag::ADVANCED_FRAME_BLENDING)
        .value("SUBLAYERS_RENDER_SEPARATELY", LayerFlag::SUBLAYERS_RENDER_SEPARATELY)
        .value("ENVIRONMENT_LAYER", LayerFlag::ENVIRONMENT_LAYER)
        .export_values();

}


void bindLayer(py::module_& m)
{
    py::class_<Layer, std::shared_ptr<Layer>>(m, "Layer")
        .def(py::init<const std::string&>())
        .def_property("name", &Layer::GetLayerName, &Layer::SetLayerName)
        .def_property("quality", &Layer::getQuality, &Layer::setQuality)
        .def_property("startTime", &Layer::getOffset, &Layer::setOffset)
        .def_property("index", &Layer::index, &Layer::changeIndex)
        .def_property("video_active", [](Layer& self) {return self.getFlag(LayerFlag::VIDEO_ACTIVE); },
            			[](Layer& self, bool value) {self.setFlag(LayerFlag::VIDEO_ACTIVE, value); })
        .def_property("audio_active", [](Layer& self) {return self.getFlag(LayerFlag::AUDIO_ACTIVE); },
            						[](Layer& self, bool value) {self.setFlag(LayerFlag::AUDIO_ACTIVE, value); })
        .def_property("effects_active", [](Layer& self) {return self.getFlag(LayerFlag::EFFECTS_ACTIVE); },
            									[](Layer& self, bool value) {self.setFlag(LayerFlag::EFFECTS_ACTIVE, value); })
        .def_property("motion_blur", [](Layer& self) {return self.getFlag(LayerFlag::MOTION_BLUR); },
            [](Layer& self, bool value) {self.setFlag(LayerFlag::MOTION_BLUR, value); })
        .def_property("frame_blending", [](Layer& self) {return self.getFlag(LayerFlag::FRAME_BLENDING); },
            			[](Layer& self, bool value) {self.setFlag(LayerFlag::FRAME_BLENDING, value); })
        .def_property("locked", [](Layer& self) {return self.getFlag(LayerFlag::LOCKED); },
            								[](Layer& self, bool value) {self.setFlag(LayerFlag::LOCKED, value); })
        .def_property("shy", [](Layer& self) {return self.getFlag(LayerFlag::SHY); },
            [](Layer& self, bool value) {self.setFlag(LayerFlag::SHY, value); })
        .def_property("collapse", [](Layer& self) {return self.getFlag(LayerFlag::COLLAPSE); },
            										[](Layer& self, bool value) {self.setFlag(LayerFlag::COLLAPSE, value); })
        .def_property("auto_orient_rotation", [](Layer& self) {return self.getFlag(LayerFlag::AUTO_ORIENT_ROTATION); },
            															[](Layer& self, bool value) {self.setFlag(LayerFlag::AUTO_ORIENT_ROTATION, value); })
        .def_property("adjustment_layer", [](Layer& self) {return self.getFlag(LayerFlag::ADJUSTMENT_LAYER); },
            			[](Layer& self, bool value) {self.setFlag(LayerFlag::ADJUSTMENT_LAYER, value); })
        .def_property("time_remapping", [](Layer& self) {return self.getFlag(LayerFlag::TIME_REMAPPING); },
            												[](Layer& self, bool value) {self.setFlag(LayerFlag::TIME_REMAPPING, value); })
        .def_property("layer_is_3d", [](Layer& self) {return self.getFlag(LayerFlag::LAYER_IS_3D); },
            [](Layer& self, bool value) {self.setFlag(LayerFlag::LAYER_IS_3D, value); })
        .def_property("look_at_camera", [](Layer& self) {return self.getFlag(LayerFlag::LOOK_AT_CAMERA); },
            															[](Layer& self, bool value) {self.setFlag(LayerFlag::LOOK_AT_CAMERA, value); })
        .def_property("look_at_poi", [](Layer& self) {return self.getFlag(LayerFlag::LOOK_AT_POI); },
            			[](Layer& self, bool value) {self.setFlag(LayerFlag::LOOK_AT_POI, value); })
        .def_property("solo", [](Layer& self) {return self.getFlag(LayerFlag::SOLO); },
            											[](Layer& self, bool value) {self.setFlag(LayerFlag::SOLO, value); })
        .def_property("markers_locked", [](Layer& self) {return self.getFlag(LayerFlag::MARKERS_LOCKED); },
            																[](Layer& self, bool value) {self.setFlag(LayerFlag::MARKERS_LOCKED, value); })
        .def_property("null_layer", [](Layer& self) {return self.getFlag(LayerFlag::NULL_LAYER); },
            				[](Layer& self, bool value) {self.setFlag(LayerFlag::NULL_LAYER, value); })
        .def_property("hide_locked_masks", [](Layer& self) {return self.getFlag(LayerFlag::HIDE_LOCKED_MASKS); },
            																			[](Layer& self, bool value) {self.setFlag(LayerFlag::HIDE_LOCKED_MASKS, value); })
        .def_property("guide_layer", [](Layer& self) {return self.getFlag(LayerFlag::GUIDE_LAYER); },
            				[](Layer& self, bool value) {self.setFlag(LayerFlag::GUIDE_LAYER, value); })
        .def_property("advanced_frame_blending", [](Layer& self) {return self.getFlag(LayerFlag::ADVANCED_FRAME_BLENDING); },
            																							[](Layer& self, bool value) {self.setFlag(LayerFlag::ADVANCED_FRAME_BLENDING, value); })
        .def_property("sublayers_render_separately", [](Layer& self) {return self.getFlag(LayerFlag::SUBLAYERS_RENDER_SEPARATELY); },
            																												[](Layer& self, bool value) {self.setFlag(LayerFlag::SUBLAYERS_RENDER_SEPARATELY, value); })
        .def_property("environment_layer", [](Layer& self) {return self.getFlag(LayerFlag::ENVIRONMENT_LAYER); },
            				[](Layer& self, bool value) {self.setFlag(LayerFlag::ENVIRONMENT_LAYER, value); })

        .def_property_readonly("sourceName", &Layer::GetSourceName)
        .def_property_readonly("time", &Layer::layerTime)
        .def_property_readonly("compTime", &Layer::layerCompTime)
        .def_property_readonly("inPoint", &Layer::inPoint)
        .def_property_readonly("compInPoint", &Layer::compInPoint)
        .def_property_readonly("duration", &Layer::duration)
        .def_property_readonly("compDuration", &Layer::compDuration)
        .def_property_readonly("source", &Layer::getSource, py::return_value_policy::reference)
        .def("delete", &Layer::deleteLayer)
        .def("duplicate", &Layer::duplicate);

}

void bindLayerCollection(py::module_& m) {
    py::class_<LayerCollection, std::shared_ptr<LayerCollection>>(m, "LayerCollection")
        .def(py::init<const std::string&, std::vector<std::shared_ptr<Layer>>>())
        .def("__getitem__", [](const LayerCollection& c, size_t i) {
        if (i < 0 || i >= c.size()) throw py::index_error();
        return c[i];
            }, py::return_value_policy::reference)
        .def("__setitem__", [](LayerCollection& c, size_t i, std::shared_ptr<Layer> l) {
                if (i >= c.size()) throw py::index_error();
                if (i < c.size()) {
                    c[i] = l;
                }
            })
        .def("__len__", [](const LayerCollection& c) { return c.size(); })
        .def("__iter__", [](const LayerCollection& c) {
        return py::make_iterator(c.begin(), c.end());
            }, py::keep_alive<0, 1>())




        .def("__str__", [](LayerCollection& c) {
            return c.getCompName();
            })

        .def("append", &LayerCollection::addLayerToCollection, py::arg("layer"), py::arg("index") = -1)
        .def("insert", &LayerCollection::addLayerToCollection, py::arg("layer"), py::arg("index"))
        .def("remove", &LayerCollection::removeLayerFromCollection, py::arg("layer"))
        .def("pop", &LayerCollection::RemoveLayerByIndex, py::arg("index") = -1)
        .def("getAllLayers", &LayerCollection::getAllLayers);

}

void bindSolidItem(py::module_& m)
{
    py::class_<SolidItem, FootageItem, std::shared_ptr<SolidItem>>(m, "SolidItem")
        .def(py::init(&SolidItem::createNew), py::arg("name") = "New Solid", py::arg("width") = 0,
            py::arg("height") = 0, py::arg("red") = 0, py::arg("green") = 0, py::arg("blue") = 0, py::arg("alpha") = 0, py::arg("duration") = 0, py::arg("index") = -1);
}

void bindItem(py::module_& m)
{
    py::class_<Item, std::shared_ptr<Item>>(m, "Item")
        .def(py::init<const std::string&>())
        .def_property_readonly("width", &Item::getWidth)
        .def_property_readonly("height", &Item::getHeight)
        .def_property_readonly("duration", &Item::getDuration)
        .def_property("time", &Item::getCurrentTime, &Item::setCurrentTime)
        .def_property("selected", &Item::isSelected, &Item::setSelected)
        .def_property("name",
            &Item::getName,
            &Item::setName);
}

void bindItemCollection(py::module_& m) {
    py::class_<ItemCollection, std::shared_ptr<ItemCollection>>(m, "ItemCollection")
        .def(py::init<const std::string&>())
        .def("__getitem__", [](const ItemCollection& c, int i) {

            size_t index = (i < 0) ? c.size() + i : i;

            if (index >= c.size()) throw py::index_error();
            return c[index];
                }, py::return_value_policy::reference)


        .def("__len__", [](const ItemCollection& c) { return c.size(); })
        .def("__iter__", [](const ItemCollection& c) {
        return py::make_iterator(c.begin(), c.end());
            }, py::keep_alive<0, 1>())

        .def("append", &ItemCollection::append, py::arg("item"))
        .def("remove", &ItemCollection::remove, py::arg("item"));
}

void bindCompItem(py::module_& m)
{


    py::class_<CompItem, Item, std::shared_ptr<CompItem>>(m, "CompItem")
        .def(py::init(&CompItem::CreateNew),
            py::arg("name") = "New Comp",
            py::arg("width") = 1920,
            py::arg("height") = 1080,
            py::arg("frameRate") = 24.0,
            py::arg("duration") = 10,
            py::arg("aspectRatio") = 1.0)
        .def_property_readonly("layer", &CompItem::getLayers, py::return_value_policy::reference)
        .def_property_readonly("layers", &CompItem::getLayers, py::return_value_policy::reference)
        .def_property_readonly("selectedLayers", &CompItem::getSelectedLayers, py::return_value_policy::reference)
        .def_property_readonly("selectedLayer", &CompItem::getSelectedLayers, py::return_value_policy::reference)
        .def_property_readonly("numLayers", &CompItem::NumLayers)
        .def_property("width", &Item::getWidth, &CompItem::setWidth)
        .def_property("height", &Item::getHeight, &CompItem::setHeight)
        .def_property("duration", &CompItem::getDuration, &CompItem::setDuration)
        .def_property("time", &CompItem::getCurrentTime, &CompItem::setCurrentTime)
        .def_property("frameRate",
            &CompItem::getFrameRate,
            &CompItem::setFrameRate);
}

void bindFootageItem(py::module_& m)
{
    py::class_<FootageItem, Item, std::shared_ptr<FootageItem>>(m, "FootageItem")
        .def(py::init(&FootageItem::createNew), py::arg("name") = "New Layer", py::arg("path") = NULL, py::arg("index") = -1)
        .def_property_readonly("path", &FootageItem::getPath)
        .def("replace", &FootageItem::replaceWithNewSource, py::arg("name"), py::arg("path"));
}

void bindProjectCollection(py::module_& m) {
    py::class_<ProjectCollection, std::shared_ptr<ProjectCollection>>(m, "ProjectCollection")
        .def(py::init<const std::string&>())
        .def("__getitem__", [](const ProjectCollection& c, int i) {

            size_t index = (i < 0) ? c.size() + i : i;

            if (index >= c.size()) throw py::index_error();
            return c[index];
                }, py::return_value_policy::reference)

        .def("__len__", [](const ProjectCollection& c) { return c.size(); })
        .def("__iter__", [](const ProjectCollection& c) {
            return py::make_iterator(c.begin(), c.end());
            }, py::keep_alive<0, 1>())

        .def("append", &ProjectCollection::append, py::arg("item"))
        .def("remove", &ProjectCollection::remove, py::arg("item"));

}

void bindFolderItem(py::module_& m)
{
    py::class_<FolderItem, Item, std::shared_ptr<FolderItem>>(m, "FolderItem")
        .def(py::init(&FolderItem::createNew), py::arg("name") = "New Folder")
        .def_property_readonly("children", &FolderItem::ChildItems, py::return_value_policy::reference);

}

void bindAdjustmentLayerItem(py::module_& m)
{
    py::class_<AdjustmentLayer, Layer, std::shared_ptr<AdjustmentLayer>>(m, "AdjustmentLayer")

        .def(py::init(&AdjustmentLayer::createNew), py::arg("comp"), py::arg("name") = "Adjustment Layer");
}

void bindProject(py::module_& m)
{
    py::class_<Project, std::shared_ptr<Project>>(m, "Project")
        .def(py::init<>())
        .def_property_readonly("activeItem", &Project::ActiveItem, py::return_value_policy::reference)
        .def_property_readonly("activeLayer", &Project::GetActiveLayer, py::return_value_policy::reference)
        .def_property_readonly("name", &Project::getName)
        .def_property_readonly("path", &Project::getPath)
        .def_property_readonly("items", &Project::ChildItems, py::return_value_policy::reference)
        .def_property_readonly("selectedItems", &Project::SelectedItems, py::return_value_policy::reference)
        .def("saveAs", &Project::saveAs, py::arg("path"));

}

void bindApp(py::module_& m)
{

    py::class_<App, std::shared_ptr<App>>(m, "App")
        .def(py::init<>())
        .def_property_readonly("path", &App::pluginPaths)
        .def_property_readonly("project", &App::getProject, py::return_value_policy::reference)
        .def("beginUndoGroup", &App::beginUndoGroup, py::arg("undo_name") = "Default Undo Group Name")
        .def("endUndoGroup", &App::endUndoGroup)
        .def("reportInfo", [](App& self, py::object info) {
        std::string infoStr = py::str(info);
        self.reportInfo(infoStr);
            }, py::arg("info"));

}

void bindManifest(py::module_& m)
{
    py::class_<Manifest>(m, "Manifest")
        .def(py::init<>())
        .def_readwrite("name", &Manifest::name)
        .def_readwrite("version", &Manifest::version)
        .def_readwrite("author", &Manifest::author)
        .def_readwrite("description", &Manifest::description)
        .def_readwrite("entry", &Manifest::entryPath)
        .def_readwrite("main", &Manifest::mainPath)
        .def_readwrite("use_js", &Manifest::useJS)
        .def_readwrite("dependencies", &Manifest::dependenciesFolder);
}
```

## File: PSCAE/PyCore.h
```c
#pragma once

#include "App.h"
#include "Project.h"
#include "ItemManager.h"
#include <pybind11/pybind11.h>
#include <pybind11/embed.h>
#include <pybind11/stl.h>
#include <pybind11/stl_bind.h>
#include <pybind11/functional.h>

namespace py = pybind11;


void bindItem(py::module_& m);
void bindCompItem(py::module_& m);
void bindFootageItem(py::module_& m);
void bindFolderItem(py::module_& m);

void bindProject(py::module_& m);
void bindApp(py::module_& m);
void bindLayer(py::module_& m);
void bindLayerEnum(py::module_& m);
void bindLayerCollection(py::module_& m);
void bindSolidItem(py::module_& m);
void bindProjectCollection(py::module_& m);
void bindItemCollection(py::module_& m);
void bindAdjustmentLayerItem(py::module_& m);
void bindManifest(py::module_& m);

class Manifest {
public:
    Manifest() :
		_validVersions({ "AE2020", "AE2021", "AE2022", "AE2023", "AE2024", "AE2025", "AE2026", "AE2027", "AE2028", "AE2029", "AE2030" }),
		_pythonDefault("3.11"),
		name("Plugin Name"),
		version("1.0.0"),
        useJS(false),
		author("Author Name"),
		description("A Python-based plugin for After Effects."),
		entryPath("path/to/entry_script.py"),
        mainPath("path/to/main_script.py"),
		dependenciesFolder({ "numpy", "opencv-python" })
	{}


    std::string name;
    std::string version;
    std::string author;
    std::string description;
    std::vector<std::string> AE_VERS;
    std::string entryPath;
    std::string mainPath;
    std::vector<std::string> dependenciesFolder;
    bool useJS = false;
    void validate();
    void load();

private:
    void _validate_versions();
	void _validate_paths();
	void _validate_dependencies();
	void _load_main();
    std::vector<std::string> _validVersions = {"AE2020", "AE2021", "AE2022", "AE2023", "AE2024", "AE2025", "AE2026", "AE2027", "AE2028", "AE2029", "AE2030"};
    std::string _pythonDefault = "3.11";
    std::string _entry;
    std::vector<std::string> _dependencies;
    py::module_ _main;

};
```

## File: PSCAE/README.md
```markdown
# PSCAE
 Supplemental Library for PyShiftAE.

# Brief:
This Repo is to hold the supplemental library being built for PyShiftAE. This repo will most likely NOT have extensive documentation, as it is here mainly to keep things separated. 

# Main Points:
This is a work in progress. You cannot use this library without PyShiftAE, and even then, it doesn't quite work right with that yet either. 

- With the new approach, this module interracts with private IPC message queues set up in PyShiftAE, in order to script from external processes.
- Yes, I know what you're thinking.. 
    - "Does this mean I can script AE from outside of AE?"
        - While possible, this is designed for internal use only. Both for PyShiftAE's specific capabilities, and to more closely adhere to Adobe's policies. 

- Why?
- Why not?
    - Kidding. This opens up more realms of possibility. 
        - In being able to run separate python processes, users will have the ability to write a simple, custom `manifest.py` file, which will define their dependencies, resources, and main scripts. PyShiftAE will then set up each extension's environment, create menu commands for the extensions, and allow users to write extensions **FULLY** in python. Extensions can have varying dependencies due to the isolation.

# Main Issues:
- Intermittent usability:
    - I haven't found a solid "why" yet, but this will work for a few runs, and then run into a lot of hangs and stop working. 
        - Sometimes clearing AE cache and temp folder fixes this, other times I have to do that + rename the `Boost` message queues. 
    - My assumption would be some sort of synchronization issues.
        - I've already implemented singleton patterns in the MessageQueues, I think perhaps IPC mutexes would be the next step?
```

## File: PSCAE/Source.cpp
```cpp
#include "pch.h"
#include <pybind11/pybind11.h>
#include "PyCore.h"
PYBIND11_MODULE(PSCAE, m) {
    bindLayer(m);
    bindItem(m);
    bindCompItem(m);
    bindFootageItem(m);
    bindFolderItem(m);
    bindProject(m);
    bindApp(m);

    bindLayerEnum(m);
    bindLayerCollection(m);
    bindProjectCollection(m);
    bindItemCollection(m);
    bindAdjustmentLayerItem(m);
    bindSolidItem(m);
    bindManifest(m);
};
```

## File: .gitattributes
```
# Auto detect text files and perform LF normalization
* text=auto
```

## File: .gitignore
```
## Ignore Visual Studio temporary files, build results, and
## files generated by popular Visual Studio add-ons.
##
## Get latest from https://github.com/github/gitignore/blob/main/VisualStudio.gitignore

# User-specific files
*.rsuser
*.suo
*.user
*.userosscache
*.sln.docstates

# User-specific files (MonoDevelop/Xamarin Studio)
*.userprefs

# Mono auto generated files
mono_crash.*

# Build results
[Dd]ebug/
[Dd]ebugPublic/
[Rr]elease/
[Rr]eleases/
x64/
x86/
[Ww][Ii][Nn]32/
[Aa][Rr][Mm]/
[Aa][Rr][Mm]64/
bld/
[Bb]in/
[Oo]bj/
[Ll]og/
[Ll]ogs/

# Visual Studio 2015/2017 cache/options directory
.vs/
# Uncomment if you have tasks that create the project's static files in wwwroot
#wwwroot/

# Visual Studio 2017 auto generated files
Generated\ Files/

# MSTest test Results
[Tt]est[Rr]esult*/
[Bb]uild[Ll]og.*

# NUnit
*.VisualState.xml
TestResult.xml
nunit-*.xml

# Build Results of an ATL Project
[Dd]ebugPS/
[Rr]eleasePS/
dlldata.c

# Benchmark Results
BenchmarkDotNet.Artifacts/

# .NET Core
project.lock.json
project.fragment.lock.json
artifacts/

# ASP.NET Scaffolding
ScaffoldingReadMe.txt

# StyleCop
StyleCopReport.xml

# Files built by Visual Studio
*_i.c
*_p.c
*_h.h
*.ilk
*.meta
*.obj
*.iobj
*.pch
*.pdb
*.ipdb
*.pgc
*.pgd
*.rsp
*.sbr
*.tlb
*.tli
*.tlh
*.tmp
*.tmp_proj
*_wpftmp.csproj
*.log
*.tlog
*.vspscc
*.vssscc
.builds
*.pidb
*.svclog
*.scc

# Chutzpah Test files
_Chutzpah*

# Visual C++ cache files
ipch/
*.aps
*.ncb
*.opendb
*.opensdf
*.sdf
*.cachefile
*.VC.db
*.VC.VC.opendb

# Visual Studio profiler
*.psess
*.vsp
*.vspx
*.sap

# Visual Studio Trace Files
*.e2e

# TFS 2012 Local Workspace
$tf/

# Guidance Automation Toolkit
*.gpState

# ReSharper is a .NET coding add-in
_ReSharper*/
*.[Rr]e[Ss]harper
*.DotSettings.user

# TeamCity is a build add-in
_TeamCity*

# DotCover is a Code Coverage Tool
*.dotCover

# AxoCover is a Code Coverage Tool
.axoCover/*
!.axoCover/settings.json

# Coverlet is a free, cross platform Code Coverage Tool
coverage*.json
coverage*.xml
coverage*.info

# Visual Studio code coverage results
*.coverage
*.coveragexml

# NCrunch
_NCrunch_*
.*crunch*.local.xml
nCrunchTemp_*

# MightyMoose
*.mm.*
AutoTest.Net/

# Web workbench (sass)
.sass-cache/

# Installshield output folder
[Ee]xpress/

# DocProject is a documentation generator add-in
DocProject/buildhelp/
DocProject/Help/*.HxT
DocProject/Help/*.HxC
DocProject/Help/*.hhc
DocProject/Help/*.hhk
DocProject/Help/*.hhp
DocProject/Help/Html2
DocProject/Help/html

# Click-Once directory
publish/

# Publish Web Output
*.[Pp]ublish.xml
*.azurePubxml
# Note: Comment the next line if you want to checkin your web deploy settings,
# but database connection strings (with potential passwords) will be unencrypted
*.pubxml
*.publishproj

# Microsoft Azure Web App publish settings. Comment the next line if you want to
# checkin your Azure Web App publish settings, but sensitive information contained
# in these scripts will be unencrypted
PublishScripts/

# NuGet Packages
*.nupkg
# NuGet Symbol Packages
*.snupkg
# The packages folder can be ignored because of Package Restore
**/[Pp]ackages/*
# except build/, which is used as an MSBuild target.
!**/[Pp]ackages/build/
# Uncomment if necessary however generally it will be regenerated when needed
#!**/[Pp]ackages/repositories.config
# NuGet v3's project.json files produces more ignorable files
*.nuget.props
*.nuget.targets

# Microsoft Azure Build Output
csx/
*.build.csdef

# Microsoft Azure Emulator
ecf/
rcf/

# Windows Store app package directories and files
AppPackages/
BundleArtifacts/
Package.StoreAssociation.xml
_pkginfo.txt
*.appx
*.appxbundle
*.appxupload

# Visual Studio cache files
# files ending in .cache can be ignored
*.[Cc]ache
# but keep track of directories ending in .cache
!?*.[Cc]ache/

# Others
ClientBin/
~$*
*~
*.dbmdl
*.dbproj.schemaview
*.jfm
*.pfx
*.publishsettings
orleans.codegen.cs

# Including strong name files can present a security risk
# (https://github.com/github/gitignore/pull/2483#issue-259490424)
#*.snk

# Since there are multiple workflows, uncomment next line to ignore bower_components
# (https://github.com/github/gitignore/pull/1529#issuecomment-104372622)
#bower_components/

# RIA/Silverlight projects
Generated_Code/

# Backup & report files from converting an old project file
# to a newer Visual Studio version. Backup files are not needed,
# because we have git ;-)
_UpgradeReport_Files/
Backup*/
UpgradeLog*.XML
UpgradeLog*.htm
ServiceFabricBackup/
*.rptproj.bak

# SQL Server files
*.mdf
*.ldf
*.ndf

# Business Intelligence projects
*.rdl.data
*.bim.layout
*.bim_*.settings
*.rptproj.rsuser
*- [Bb]ackup.rdl
*- [Bb]ackup ([0-9]).rdl
*- [Bb]ackup ([0-9][0-9]).rdl

# Microsoft Fakes
FakesAssemblies/

# GhostDoc plugin setting file
*.GhostDoc.xml

# Node.js Tools for Visual Studio
.ntvs_analysis.dat
node_modules/

# Visual Studio 6 build log
*.plg

# Visual Studio 6 workspace options file
*.opt

# Visual Studio 6 auto-generated workspace file (contains which files were open etc.)
*.vbw

# Visual Studio 6 auto-generated project file (contains which files were open etc.)
*.vbp

# Visual Studio 6 workspace and project file (working project files containing files to include in project)
*.dsw
*.dsp

# Visual Studio 6 technical files 
*.ncb
*.aps

# Visual Studio LightSwitch build output
**/*.HTMLClient/GeneratedArtifacts
**/*.DesktopClient/GeneratedArtifacts
**/*.DesktopClient/ModelManifest.xml
**/*.Server/GeneratedArtifacts
**/*.Server/ModelManifest.xml
_Pvt_Extensions

# Paket dependency manager
.paket/paket.exe
paket-files/

# FAKE - F# Make
.fake/

# CodeRush personal settings
.cr/personal

# Python Tools for Visual Studio (PTVS)
__pycache__/
*.pyc

# Cake - Uncomment if you are using it
# tools/**
# !tools/packages.config

# Tabs Studio
*.tss

# Telerik's JustMock configuration file
*.jmconfig

# BizTalk build output
*.btp.cs
*.btm.cs
*.odx.cs
*.xsd.cs

# OpenCover UI analysis results
OpenCover/

# Azure Stream Analytics local run output
ASALocalRun/

# MSBuild Binary and Structured Log
*.binlog

# NVidia Nsight GPU debugger configuration file
*.nvuser

# MFractors (Xamarin productivity tool) working folder
.mfractor/

# Local History for Visual Studio
.localhistory/

# Visual Studio History (VSHistory) files
.vshistory/

# BeatPulse healthcheck temp database
healthchecksdb

# Backup folder for Package Reference Convert tool in Visual Studio 2017
MigrationBackup/

# Ionide (cross platform F# VS Code tools) working folder
.ionide/

# Fody - auto-generated XML schema
FodyWeavers.xsd

# VS Code files for those working on multiple tools
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace

# Local History for Visual Studio Code
.history/

# Windows Installer files from build outputs
*.cab
*.msi
*.msix
*.msm
*.msp

# JetBrains Rider
*.sln.iml
```

## File: LICENSE
```
GNU AFFERO GENERAL PUBLIC LICENSE
                       Version 3, 19 November 2007

 Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>
 Everyone is permitted to copy and distribute verbatim copies
 of this license document, but changing it is not allowed.

                            Preamble

  The GNU Affero General Public License is a free, copyleft license for
software and other kinds of works, specifically designed to ensure
cooperation with the community in the case of network server software.

  The licenses for most software and other practical works are designed
to take away your freedom to share and change the works.  By contrast,
our General Public Licenses are intended to guarantee your freedom to
share and change all versions of a program--to make sure it remains free
software for all its users.

  When we speak of free software, we are referring to freedom, not
price.  Our General Public Licenses are designed to make sure that you
have the freedom to distribute copies of free software (and charge for
them if you wish), that you receive source code or can get it if you
want it, that you can change the software or use pieces of it in new
free programs, and that you know you can do these things.

  Developers that use our General Public Licenses protect your rights
with two steps: (1) assert copyright on the software, and (2) offer
you this License which gives you legal permission to copy, distribute
and/or modify the software.

  A secondary benefit of defending all users' freedom is that
improvements made in alternate versions of the program, if they
receive widespread use, become available for other developers to
incorporate.  Many developers of free software are heartened and
encouraged by the resulting cooperation.  However, in the case of
software used on network servers, this result may fail to come about.
The GNU General Public License permits making a modified version and
letting the public access it on a server without ever releasing its
source code to the public.

  The GNU Affero General Public License is designed specifically to
ensure that, in such cases, the modified source code becomes available
to the community.  It requires the operator of a network server to
provide the source code of the modified version running there to the
users of that server.  Therefore, public use of a modified version, on
a publicly accessible server, gives the public access to the source
code of the modified version.

  An older license, called the Affero General Public License and
published by Affero, was designed to accomplish similar goals.  This is
a different license, not a version of the Affero GPL, but Affero has
released a new version of the Affero GPL which permits relicensing under
this license.

  The precise terms and conditions for copying, distribution and
modification follow.

                       TERMS AND CONDITIONS

  0. Definitions.

  "This License" refers to version 3 of the GNU Affero General Public License.

  "Copyright" also means copyright-like laws that apply to other kinds of
works, such as semiconductor masks.

  "The Program" refers to any copyrightable work licensed under this
License.  Each licensee is addressed as "you".  "Licensees" and
"recipients" may be individuals or organizations.

  To "modify" a work means to copy from or adapt all or part of the work
in a fashion requiring copyright permission, other than the making of an
exact copy.  The resulting work is called a "modified version" of the
earlier work or a work "based on" the earlier work.

  A "covered work" means either the unmodified Program or a work based
on the Program.

  To "propagate" a work means to do anything with it that, without
permission, would make you directly or secondarily liable for
infringement under applicable copyright law, except executing it on a
computer or modifying a private copy.  Propagation includes copying,
distribution (with or without modification), making available to the
public, and in some countries other activities as well.

  To "convey" a work means any kind of propagation that enables other
parties to make or receive copies.  Mere interaction with a user through
a computer network, with no transfer of a copy, is not conveying.

  An interactive user interface displays "Appropriate Legal Notices"
to the extent that it includes a convenient and prominently visible
feature that (1) displays an appropriate copyright notice, and (2)
tells the user that there is no warranty for the work (except to the
extent that warranties are provided), that licensees may convey the
work under this License, and how to view a copy of this License.  If
the interface presents a list of user commands or options, such as a
menu, a prominent item in the list meets this criterion.

  1. Source Code.

  The "source code" for a work means the preferred form of the work
for making modifications to it.  "Object code" means any non-source
form of a work.

  A "Standard Interface" means an interface that either is an official
standard defined by a recognized standards body, or, in the case of
interfaces specified for a particular programming language, one that
is widely used among developers working in that language.

  The "System Libraries" of an executable work include anything, other
than the work as a whole, that (a) is included in the normal form of
packaging a Major Component, but which is not part of that Major
Component, and (b) serves only to enable use of the work with that
Major Component, or to implement a Standard Interface for which an
implementation is available to the public in source code form.  A
"Major Component", in this context, means a major essential component
(kernel, window system, and so on) of the specific operating system
(if any) on which the executable work runs, or a compiler used to
produce the work, or an object code interpreter used to run it.

  The "Corresponding Source" for a work in object code form means all
the source code needed to generate, install, and (for an executable
work) run the object code and to modify the work, including scripts to
control those activities.  However, it does not include the work's
System Libraries, or general-purpose tools or generally available free
programs which are used unmodified in performing those activities but
which are not part of the work.  For example, Corresponding Source
includes interface definition files associated with source files for
the work, and the source code for shared libraries and dynamically
linked subprograms that the work is specifically designed to require,
such as by intimate data communication or control flow between those
subprograms and other parts of the work.

  The Corresponding Source need not include anything that users
can regenerate automatically from other parts of the Corresponding
Source.

  The Corresponding Source for a work in source code form is that
same work.

  2. Basic Permissions.

  All rights granted under this License are granted for the term of
copyright on the Program, and are irrevocable provided the stated
conditions are met.  This License explicitly affirms your unlimited
permission to run the unmodified Program.  The output from running a
covered work is covered by this License only if the output, given its
content, constitutes a covered work.  This License acknowledges your
rights of fair use or other equivalent, as provided by copyright law.

  You may make, run and propagate covered works that you do not
convey, without conditions so long as your license otherwise remains
in force.  You may convey covered works to others for the sole purpose
of having them make modifications exclusively for you, or provide you
with facilities for running those works, provided that you comply with
the terms of this License in conveying all material for which you do
not control copyright.  Those thus making or running the covered works
for you must do so exclusively on your behalf, under your direction
and control, on terms that prohibit them from making any copies of
your copyrighted material outside their relationship with you.

  Conveying under any other circumstances is permitted solely under
the conditions stated below.  Sublicensing is not allowed; section 10
makes it unnecessary.

  3. Protecting Users' Legal Rights From Anti-Circumvention Law.

  No covered work shall be deemed part of an effective technological
measure under any applicable law fulfilling obligations under article
11 of the WIPO copyright treaty adopted on 20 December 1996, or
similar laws prohibiting or restricting circumvention of such
measures.

  When you convey a covered work, you waive any legal power to forbid
circumvention of technological measures to the extent such circumvention
is effected by exercising rights under this License with respect to
the covered work, and you disclaim any intention to limit operation or
modification of the work as a means of enforcing, against the work's
users, your or third parties' legal rights to forbid circumvention of
technological measures.

  4. Conveying Verbatim Copies.

  You may convey verbatim copies of the Program's source code as you
receive it, in any medium, provided that you conspicuously and
appropriately publish on each copy an appropriate copyright notice;
keep intact all notices stating that this License and any
non-permissive terms added in accord with section 7 apply to the code;
keep intact all notices of the absence of any warranty; and give all
recipients a copy of this License along with the Program.

  You may charge any price or no price for each copy that you convey,
and you may offer support or warranty protection for a fee.

  5. Conveying Modified Source Versions.

  You may convey a work based on the Program, or the modifications to
produce it from the Program, in the form of source code under the
terms of section 4, provided that you also meet all of these conditions:

    a) The work must carry prominent notices stating that you modified
    it, and giving a relevant date.

    b) The work must carry prominent notices stating that it is
    released under this License and any conditions added under section
    7.  This requirement modifies the requirement in section 4 to
    "keep intact all notices".

    c) You must license the entire work, as a whole, under this
    License to anyone who comes into possession of a copy.  This
    License will therefore apply, along with any applicable section 7
    additional terms, to the whole of the work, and all its parts,
    regardless of how they are packaged.  This License gives no
    permission to license the work in any other way, but it does not
    invalidate such permission if you have separately received it.

    d) If the work has interactive user interfaces, each must display
    Appropriate Legal Notices; however, if the Program has interactive
    interfaces that do not display Appropriate Legal Notices, your
    work need not make them do so.

  A compilation of a covered work with other separate and independent
works, which are not by their nature extensions of the covered work,
and which are not combined with it such as to form a larger program,
in or on a volume of a storage or distribution medium, is called an
"aggregate" if the compilation and its resulting copyright are not
used to limit the access or legal rights of the compilation's users
beyond what the individual works permit.  Inclusion of a covered work
in an aggregate does not cause this License to apply to the other
parts of the aggregate.

  6. Conveying Non-Source Forms.

  You may convey a covered work in object code form under the terms
of sections 4 and 5, provided that you also convey the
machine-readable Corresponding Source under the terms of this License,
in one of these ways:

    a) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by the
    Corresponding Source fixed on a durable physical medium
    customarily used for software interchange.

    b) Convey the object code in, or embodied in, a physical product
    (including a physical distribution medium), accompanied by a
    written offer, valid for at least three years and valid for as
    long as you offer spare parts or customer support for that product
    model, to give anyone who possesses the object code either (1) a
    copy of the Corresponding Source for all the software in the
    product that is covered by this License, on a durable physical
    medium customarily used for software interchange, for a price no
    more than your reasonable cost of physically performing this
    conveying of source, or (2) access to copy the
    Corresponding Source from a network server at no charge.

    c) Convey individual copies of the object code with a copy of the
    written offer to provide the Corresponding Source.  This
    alternative is allowed only occasionally and noncommercially, and
    only if you received the object code with such an offer, in accord
    with subsection 6b.

    d) Convey the object code by offering access from a designated
    place (gratis or for a charge), and offer equivalent access to the
    Corresponding Source in the same way through the same place at no
    further charge.  You need not require recipients to copy the
    Corresponding Source along with the object code.  If the place to
    copy the object code is a network server, the Corresponding Source
    may be on a different server (operated by you or a third party)
    that supports equivalent copying facilities, provided you maintain
    clear directions next to the object code saying where to find the
    Corresponding Source.  Regardless of what server hosts the
    Corresponding Source, you remain obligated to ensure that it is
    available for as long as needed to satisfy these requirements.

    e) Convey the object code using peer-to-peer transmission, provided
    you inform other peers where the object code and Corresponding
    Source of the work are being offered to the general public at no
    charge under subsection 6d.

  A separable portion of the object code, whose source code is excluded
from the Corresponding Source as a System Library, need not be
included in conveying the object code work.

  A "User Product" is either (1) a "consumer product", which means any
tangible personal property which is normally used for personal, family,
or household purposes, or (2) anything designed or sold for incorporation
into a dwelling.  In determining whether a product is a consumer product,
doubtful cases shall be resolved in favor of coverage.  For a particular
product received by a particular user, "normally used" refers to a
typical or common use of that class of product, regardless of the status
of the particular user or of the way in which the particular user
actually uses, or expects or is expected to use, the product.  A product
is a consumer product regardless of whether the product has substantial
commercial, industrial or non-consumer uses, unless such uses represent
the only significant mode of use of the product.

  "Installation Information" for a User Product means any methods,
procedures, authorization keys, or other information required to install
and execute modified versions of a covered work in that User Product from
a modified version of its Corresponding Source.  The information must
suffice to ensure that the continued functioning of the modified object
code is in no case prevented or interfered with solely because
modification has been made.

  If you convey an object code work under this section in, or with, or
specifically for use in, a User Product, and the conveying occurs as
part of a transaction in which the right of possession and use of the
User Product is transferred to the recipient in perpetuity or for a
fixed term (regardless of how the transaction is characterized), the
Corresponding Source conveyed under this section must be accompanied
by the Installation Information.  But this requirement does not apply
if neither you nor any third party retains the ability to install
modified object code on the User Product (for example, the work has
been installed in ROM).

  The requirement to provide Installation Information does not include a
requirement to continue to provide support service, warranty, or updates
for a work that has been modified or installed by the recipient, or for
the User Product in which it has been modified or installed.  Access to a
network may be denied when the modification itself materially and
adversely affects the operation of the network or violates the rules and
protocols for communication across the network.

  Corresponding Source conveyed, and Installation Information provided,
in accord with this section must be in a format that is publicly
documented (and with an implementation available to the public in
source code form), and must require no special password or key for
unpacking, reading or copying.

  7. Additional Terms.

  "Additional permissions" are terms that supplement the terms of this
License by making exceptions from one or more of its conditions.
Additional permissions that are applicable to the entire Program shall
be treated as though they were included in this License, to the extent
that they are valid under applicable law.  If additional permissions
apply only to part of the Program, that part may be used separately
under those permissions, but the entire Program remains governed by
this License without regard to the additional permissions.

  When you convey a copy of a covered work, you may at your option
remove any additional permissions from that copy, or from any part of
it.  (Additional permissions may be written to require their own
removal in certain cases when you modify the work.)  You may place
additional permissions on material, added by you to a covered work,
for which you have or can give appropriate copyright permission.

  Notwithstanding any other provision of this License, for material you
add to a covered work, you may (if authorized by the copyright holders of
that material) supplement the terms of this License with terms:

    a) Disclaiming warranty or limiting liability differently from the
    terms of sections 15 and 16 of this License; or

    b) Requiring preservation of specified reasonable legal notices or
    author attributions in that material or in the Appropriate Legal
    Notices displayed by works containing it; or

    c) Prohibiting misrepresentation of the origin of that material, or
    requiring that modified versions of such material be marked in
    reasonable ways as different from the original version; or

    d) Limiting the use for publicity purposes of names of licensors or
    authors of the material; or

    e) Declining to grant rights under trademark law for use of some
    trade names, trademarks, or service marks; or

    f) Requiring indemnification of licensors and authors of that
    material by anyone who conveys the material (or modified versions of
    it) with contractual assumptions of liability to the recipient, for
    any liability that these contractual assumptions directly impose on
    those licensors and authors.

  All other non-permissive additional terms are considered "further
restrictions" within the meaning of section 10.  If the Program as you
received it, or any part of it, contains a notice stating that it is
governed by this License along with a term that is a further
restriction, you may remove that term.  If a license document contains
a further restriction but permits relicensing or conveying under this
License, you may add to a covered work material governed by the terms
of that license document, provided that the further restriction does
not survive such relicensing or conveying.

  If you add terms to a covered work in accord with this section, you
must place, in the relevant source files, a statement of the
additional terms that apply to those files, or a notice indicating
where to find the applicable terms.

  Additional terms, permissive or non-permissive, may be stated in the
form of a separately written license, or stated as exceptions;
the above requirements apply either way.

  8. Termination.

  You may not propagate or modify a covered work except as expressly
provided under this License.  Any attempt otherwise to propagate or
modify it is void, and will automatically terminate your rights under
this License (including any patent licenses granted under the third
paragraph of section 11).

  However, if you cease all violation of this License, then your
license from a particular copyright holder is reinstated (a)
provisionally, unless and until the copyright holder explicitly and
finally terminates your license, and (b) permanently, if the copyright
holder fails to notify you of the violation by some reasonable means
prior to 60 days after the cessation.

  Moreover, your license from a particular copyright holder is
reinstated permanently if the copyright holder notifies you of the
violation by some reasonable means, this is the first time you have
received notice of violation of this License (for any work) from that
copyright holder, and you cure the violation prior to 30 days after
your receipt of the notice.

  Termination of your rights under this section does not terminate the
licenses of parties who have received copies or rights from you under
this License.  If your rights have been terminated and not permanently
reinstated, you do not qualify to receive new licenses for the same
material under section 10.

  9. Acceptance Not Required for Having Copies.

  You are not required to accept this License in order to receive or
run a copy of the Program.  Ancillary propagation of a covered work
occurring solely as a consequence of using peer-to-peer transmission
to receive a copy likewise does not require acceptance.  However,
nothing other than this License grants you permission to propagate or
modify any covered work.  These actions infringe copyright if you do
not accept this License.  Therefore, by modifying or propagating a
covered work, you indicate your acceptance of this License to do so.

  10. Automatic Licensing of Downstream Recipients.

  Each time you convey a covered work, the recipient automatically
receives a license from the original licensors, to run, modify and
propagate that work, subject to this License.  You are not responsible
for enforcing compliance by third parties with this License.

  An "entity transaction" is a transaction transferring control of an
organization, or substantially all assets of one, or subdividing an
organization, or merging organizations.  If propagation of a covered
work results from an entity transaction, each party to that
transaction who receives a copy of the work also receives whatever
licenses to the work the party's predecessor in interest had or could
give under the previous paragraph, plus a right to possession of the
Corresponding Source of the work from the predecessor in interest, if
the predecessor has it or can get it with reasonable efforts.

  You may not impose any further restrictions on the exercise of the
rights granted or affirmed under this License.  For example, you may
not impose a license fee, royalty, or other charge for exercise of
rights granted under this License, and you may not initiate litigation
(including a cross-claim or counterclaim in a lawsuit) alleging that
any patent claim is infringed by making, using, selling, offering for
sale, or importing the Program or any portion of it.

  11. Patents.

  A "contributor" is a copyright holder who authorizes use under this
License of the Program or a work on which the Program is based.  The
work thus licensed is called the contributor's "contributor version".

  A contributor's "essential patent claims" are all patent claims
owned or controlled by the contributor, whether already acquired or
hereafter acquired, that would be infringed by some manner, permitted
by this License, of making, using, or selling its contributor version,
but do not include claims that would be infringed only as a
consequence of further modification of the contributor version.  For
purposes of this definition, "control" includes the right to grant
patent sublicenses in a manner consistent with the requirements of
this License.

  Each contributor grants you a non-exclusive, worldwide, royalty-free
patent license under the contributor's essential patent claims, to
make, use, sell, offer for sale, import and otherwise run, modify and
propagate the contents of its contributor version.

  In the following three paragraphs, a "patent license" is any express
agreement or commitment, however denominated, not to enforce a patent
(such as an express permission to practice a patent or covenant not to
sue for patent infringement).  To "grant" such a patent license to a
party means to make such an agreement or commitment not to enforce a
patent against the party.

  If you convey a covered work, knowingly relying on a patent license,
and the Corresponding Source of the work is not available for anyone
to copy, free of charge and under the terms of this License, through a
publicly available network server or other readily accessible means,
then you must either (1) cause the Corresponding Source to be so
available, or (2) arrange to deprive yourself of the benefit of the
patent license for this particular work, or (3) arrange, in a manner
consistent with the requirements of this License, to extend the patent
license to downstream recipients.  "Knowingly relying" means you have
actual knowledge that, but for the patent license, your conveying the
covered work in a country, or your recipient's use of the covered work
in a country, would infringe one or more identifiable patents in that
country that you have reason to believe are valid.

  If, pursuant to or in connection with a single transaction or
arrangement, you convey, or propagate by procuring conveyance of, a
covered work, and grant a patent license to some of the parties
receiving the covered work authorizing them to use, propagate, modify
or convey a specific copy of the covered work, then the patent license
you grant is automatically extended to all recipients of the covered
work and works based on it.

  A patent license is "discriminatory" if it does not include within
the scope of its coverage, prohibits the exercise of, or is
conditioned on the non-exercise of one or more of the rights that are
specifically granted under this License.  You may not convey a covered
work if you are a party to an arrangement with a third party that is
in the business of distributing software, under which you make payment
to the third party based on the extent of your activity of conveying
the work, and under which the third party grants, to any of the
parties who would receive the covered work from you, a discriminatory
patent license (a) in connection with copies of the covered work
conveyed by you (or copies made from those copies), or (b) primarily
for and in connection with specific products or compilations that
contain the covered work, unless you entered into that arrangement,
or that patent license was granted, prior to 28 March 2007.

  Nothing in this License shall be construed as excluding or limiting
any implied license or other defenses to infringement that may
otherwise be available to you under applicable patent law.

  12. No Surrender of Others' Freedom.

  If conditions are imposed on you (whether by court order, agreement or
otherwise) that contradict the conditions of this License, they do not
excuse you from the conditions of this License.  If you cannot convey a
covered work so as to satisfy simultaneously your obligations under this
License and any other pertinent obligations, then as a consequence you may
not convey it at all.  For example, if you agree to terms that obligate you
to collect a royalty for further conveying from those to whom you convey
the Program, the only way you could satisfy both those terms and this
License would be to refrain entirely from conveying the Program.

  13. Remote Network Interaction; Use with the GNU General Public License.

  Notwithstanding any other provision of this License, if you modify the
Program, your modified version must prominently offer all users
interacting with it remotely through a computer network (if your version
supports such interaction) an opportunity to receive the Corresponding
Source of your version by providing access to the Corresponding Source
from a network server at no charge, through some standard or customary
means of facilitating copying of software.  This Corresponding Source
shall include the Corresponding Source for any work covered by version 3
of the GNU General Public License that is incorporated pursuant to the
following paragraph.

  Notwithstanding any other provision of this License, you have
permission to link or combine any covered work with a work licensed
under version 3 of the GNU General Public License into a single
combined work, and to convey the resulting work.  The terms of this
License will continue to apply to the part which is the covered work,
but the work with which it is combined will remain governed by version
3 of the GNU General Public License.

  14. Revised Versions of this License.

  The Free Software Foundation may publish revised and/or new versions of
the GNU Affero General Public License from time to time.  Such new versions
will be similar in spirit to the present version, but may differ in detail to
address new problems or concerns.

  Each version is given a distinguishing version number.  If the
Program specifies that a certain numbered version of the GNU Affero General
Public License "or any later version" applies to it, you have the
option of following the terms and conditions either of that numbered
version or of any later version published by the Free Software
Foundation.  If the Program does not specify a version number of the
GNU Affero General Public License, you may choose any version ever published
by the Free Software Foundation.

  If the Program specifies that a proxy can decide which future
versions of the GNU Affero General Public License can be used, that proxy's
public statement of acceptance of a version permanently authorizes you
to choose that version for the Program.

  Later license versions may give you additional or different
permissions.  However, no additional obligations are imposed on any
author or copyright holder as a result of your choosing to follow a
later version.

  15. Disclaimer of Warranty.

  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

  16. Limitation of Liability.

  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING
WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS
THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY
GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE
USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF
DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD
PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),
EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF
SUCH DAMAGES.

  17. Interpretation of Sections 15 and 16.

  If the disclaimer of warranty and limitation of liability provided
above cannot be given local legal effect according to their terms,
reviewing courts shall apply local law that most closely approximates
an absolute waiver of all civil liability in connection with the
Program, unless a warranty or assumption of liability accompanies a
copy of the Program in return for a fee.

                     END OF TERMS AND CONDITIONS

            How to Apply These Terms to Your New Programs

  If you develop a new program, and you want it to be of the greatest
possible use to the public, the best way to achieve this is to make it
free software which everyone can redistribute and change under these terms.

  To do so, attach the following notices to the program.  It is safest
to attach them to the start of each source file to most effectively
state the exclusion of warranty; and each file should have at least
the "copyright" line and a pointer to where the full notice is found.

    <one line to give the program's name and a brief idea of what it does.>
    Copyright (C) <year>  <name of author>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published
    by the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

Also add information on how to contact you by electronic and paper mail.

  If your software can interact with users remotely through a computer
network, you should also make sure that it provides a way for users to
get its source.  For example, if your program is a web application, its
interface could display a "Source" link that leads users to an archive
of the code.  There are many ways you could offer source, and different
solutions will be better for different programs; see section 13 for the
specific requirements.

  You should also get your employer (if you work as a programmer) or school,
if any, to sign a "copyright disclaimer" for the program, if necessary.
For more information on this, and how to apply and follow the GNU AGPL, see
<https://www.gnu.org/licenses/>.
```

## File: PSCAE.sln
```
Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 17
VisualStudioVersion = 17.6.33801.468
MinimumVisualStudioVersion = 10.0.40219.1
Project("{8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942}") = "PSCAE", "PSCAE\PSCAE.vcxproj", "{AC5AACD0-2B74-483F-AE62-C8C4DD9BAAFD}"
EndProject
Global
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|x64 = Debug|x64
		Debug|x86 = Debug|x86
		Release|x64 = Release|x64
		Release|x86 = Release|x86
	EndGlobalSection
	GlobalSection(ProjectConfigurationPlatforms) = postSolution
		{AC5AACD0-2B74-483F-AE62-C8C4DD9BAAFD}.Debug|x64.ActiveCfg = Debug|x64
		{AC5AACD0-2B74-483F-AE62-C8C4DD9BAAFD}.Debug|x64.Build.0 = Debug|x64
		{AC5AACD0-2B74-483F-AE62-C8C4DD9BAAFD}.Debug|x86.ActiveCfg = Debug|Win32
		{AC5AACD0-2B74-483F-AE62-C8C4DD9BAAFD}.Debug|x86.Build.0 = Debug|Win32
		{AC5AACD0-2B74-483F-AE62-C8C4DD9BAAFD}.Release|x64.ActiveCfg = Release|x64
		{AC5AACD0-2B74-483F-AE62-C8C4DD9BAAFD}.Release|x64.Build.0 = Release|x64
		{AC5AACD0-2B74-483F-AE62-C8C4DD9BAAFD}.Release|x86.ActiveCfg = Release|Win32
		{AC5AACD0-2B74-483F-AE62-C8C4DD9BAAFD}.Release|x86.Build.0 = Release|Win32
	EndGlobalSection
	GlobalSection(SolutionProperties) = preSolution
		HideSolutionNode = FALSE
	EndGlobalSection
	GlobalSection(ExtensibilityGlobals) = postSolution
		SolutionGuid = {942AFD2F-5A54-4A00-A9EA-0D6A29370DEE}
	EndGlobalSection
EndGlobal
```

## File: README.md
```markdown
# PyShift-Utils
 [WiP] Supplemental Library for PyShiftAE.

# Brief:
This Repo is to hold the supplemental library being built for PyShiftAE. This repo will most likely NOT have extensive documentation, as it is here mainly to keep things separated. 

# Main Points:
This is a work in progress. You cannot use this library without PyShiftAE, and even then, it doesn't quite work right with that yet either. 

- With the new approach, this module interracts with private IPC message queues set up in PyShiftAE, in order to script from external processes.
- Yes, I know what you're thinking.. 
    - "Does this mean I can script AE from outside of AE?"
        - While possible, this is designed for internal use only. Both for PyShiftAE's specific capabilities, and to more closely adhere to Adobe's policies. 

- Why?
- Why not?
    - Kidding. This opens up more realms of possibility. 
        - In being able to run separate python processes, users will have the ability to write a simple, custom `manifest.py` file, which will define their dependencies, resources, and main scripts. PyShiftAE will then set up each extension's environment, create menu commands for the extensions, and allow users to write extensions **FULLY** in python. Extensions can have varying dependencies due to the isolation.

# Main Issues:
- Intermittent usability:
    - I haven't found a solid "why" yet, but this will work for a few runs, and then run into a lot of hangs and stop working. 
        - Sometimes clearing AE cache and temp folder fixes this, other times I have to do that + rename the `Boost` message queues. 
    - My assumption would be some sort of synchronization issues.
        - I've already implemented singleton patterns in the MessageQueues, I think perhaps IPC mutexes would be the next step?
```
