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
AEGP/
  Grabba/
    Mac/
      Grabba.xcodeproj/
        xcuserdata/
          field.xcuserdatad/
            xcschemes/
              xcschememanagement.plist
        project.pbxproj
      Grabba.plugin-Info.plist
    Win/
      x64/
        Debug/
          AEGP_SuiteHandler.obj
          AEGP_SuiteHandler.sbr
          CSXUtils.obj
          CSXUtils.sbr
          Grabba.aex.recipe
          Grabba.bsc
          Grabba.exp
          Grabba.lib
          Grabba.obj
      CSXSUtils.h
      Grabba_PiPL.rc
      Grabba.sln
      Grabba.vcxproj
      Grabba.vcxproj.filters
      Grabba.vcxproj.user
    cbase64.h
    CSXUtils.cpp
    Grabba_PiPL.r
    Grabba_Strings.cpp
    Grabba_Strings.h
    Grabba.cpp
    Grabba.h
HelloWorld/
  include/
    SoCClient.h
    SoSharedLibDefs.h
  jsx/
    HellowWorld.jsx
  x64/
    Debug/
      dll/
        HelloWorld.dll
        HelloWorld.exp
        HelloWorld.lib
        HelloWorld.pdb
      HelloWorld.tlog/
        CL.command.1.tlog
        Cl.items.tlog
        CL.read.1.tlog
        CL.write.1.tlog
        HelloWorld.lastbuildstate
        link.command.1.tlog
        link.read.1.tlog
        link.write.1.tlog
        link.write.2u.tlog
      AEGP_SuiteHandler.obj
      HelloWorld.dll.recipe
      HelloWorld.ilk
      HelloWorld.obj
      HelloWorld.vcxproj.FileListAbsolute.txt
      MissingSuiteError.obj
      vc143.pdb
  HelloWorld.cpp
  HelloWorld.sln
  HelloWorld.vcproj
  HelloWorld.vcxproj
  HelloWorld.vcxproj.filters
  HelloWorld.vcxproj.user
  HellowWorld.h
  LICENSE
  README.md
  README.pdf
  samplelib.h
  Setup_HelloWorld.vdproj
  Source.cpp
  UpgradeLog.htm
Includes.zip
plugplugdump.txt
README.md
```

# Files

## File: AEGP/Grabba/Mac/Grabba.xcodeproj/xcuserdata/field.xcuserdatad/xcschemes/xcschememanagement.plist
````
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>SchemeUserState</key>
	<dict>
		<key>Grabba.xcscheme_^#shared#^_</key>
		<dict>
			<key>orderHint</key>
			<integer>8</integer>
		</dict>
	</dict>
</dict>
</plist>
````

## File: AEGP/Grabba/Mac/Grabba.xcodeproj/project.pbxproj
````
// !$*UTF8*$!
{
	archiveVersion = 1;
	classes = {
	};
	objectVersion = 46;
	objects = {

/* Begin PBXBuildFile section */
		7EF3700016F29B86002A3CB3 /* Cocoa.framework in Frameworks */ = {isa = PBXBuildFile; fileRef = 7EF36FFF16F29B86002A3CB3 /* Cocoa.framework */; };
		D0FDF9BA09941656008E4F6B /* Grabba_Strings.cpp in Sources */ = {isa = PBXBuildFile; fileRef = D0FDF9B509941656008E4F6B /* Grabba_Strings.cpp */; };
		D0FDF9BB09941656008E4F6B /* Grabba.cpp in Sources */ = {isa = PBXBuildFile; fileRef = D0FDF9B709941656008E4F6B /* Grabba.cpp */; };
		D0FDF9BC09941656008E4F6B /* Grabba_PiPL.r in Rez */ = {isa = PBXBuildFile; fileRef = D0FDF9B909941656008E4F6B /* Grabba_PiPL.r */; };
		D0FE579D0993C5E500139A60 /* AEGP_SuiteHandler.cpp in Sources */ = {isa = PBXBuildFile; fileRef = D0FE579A0993C5E500139A60 /* AEGP_SuiteHandler.cpp */; };
		D0FE579E0993C5E500139A60 /* MissingSuiteError.cpp in Sources */ = {isa = PBXBuildFile; fileRef = D0FE579C0993C5E500139A60 /* MissingSuiteError.cpp */; };
/* End PBXBuildFile section */

/* Begin PBXFileReference section */
		7EF36FFF16F29B86002A3CB3 /* Cocoa.framework */ = {isa = PBXFileReference; lastKnownFileType = wrapper.framework; name = Cocoa.framework; path = System/Library/Frameworks/Cocoa.framework; sourceTree = SDKROOT; };
		7EF3705016F29C72002A3CB3 /* Grabba.h */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.h; name = Grabba.h; path = ../Grabba.h; sourceTree = "<group>"; };
		7EF3705116F29C7C002A3CB3 /* Grabba_Strings.h */ = {isa = PBXFileReference; fileEncoding = 4; lastKnownFileType = sourcecode.c.h; name = Grabba_Strings.h; path = ../Grabba_Strings.h; sourceTree = "<group>"; };
		C4E618CC095A3CE80012CA3F /* Grabba.plugin */ = {isa = PBXFileReference; explicitFileType = wrapper.cfbundle; includeInIndex = 0; path = Grabba.plugin; sourceTree = BUILT_PRODUCTS_DIR; };
		D0FDF9B509941656008E4F6B /* Grabba_Strings.cpp */ = {isa = PBXFileReference; fileEncoding = 30; lastKnownFileType = sourcecode.cpp.cpp; name = Grabba_Strings.cpp; path = ../Grabba_Strings.cpp; sourceTree = SOURCE_ROOT; };
		D0FDF9B709941656008E4F6B /* Grabba.cpp */ = {isa = PBXFileReference; fileEncoding = 30; lastKnownFileType = sourcecode.cpp.cpp; name = Grabba.cpp; path = ../Grabba.cpp; sourceTree = SOURCE_ROOT; };
		D0FDF9B909941656008E4F6B /* Grabba_PiPL.r */ = {isa = PBXFileReference; fileEncoding = 30; lastKnownFileType = sourcecode.rez; name = Grabba_PiPL.r; path = ../Grabba_PiPL.r; sourceTree = SOURCE_ROOT; };
		D0FE579A0993C5E500139A60 /* AEGP_SuiteHandler.cpp */ = {isa = PBXFileReference; fileEncoding = 30; lastKnownFileType = sourcecode.cpp.cpp; name = AEGP_SuiteHandler.cpp; path = ../../../Util/AEGP_SuiteHandler.cpp; sourceTree = SOURCE_ROOT; };
		D0FE579B0993C5E500139A60 /* AEGP_SuiteHandler.h */ = {isa = PBXFileReference; fileEncoding = 30; lastKnownFileType = sourcecode.c.h; name = AEGP_SuiteHandler.h; path = ../../../Util/AEGP_SuiteHandler.h; sourceTree = SOURCE_ROOT; };
		D0FE579C0993C5E500139A60 /* MissingSuiteError.cpp */ = {isa = PBXFileReference; fileEncoding = 30; lastKnownFileType = sourcecode.cpp.cpp; name = MissingSuiteError.cpp; path = ../../../Util/MissingSuiteError.cpp; sourceTree = SOURCE_ROOT; };
/* End PBXFileReference section */

/* Begin PBXFrameworksBuildPhase section */
		C4E618CA095A3CE80012CA3F /* Frameworks */ = {
			isa = PBXFrameworksBuildPhase;
			buildActionMask = 2147483647;
			files = (
				7EF3700016F29B86002A3CB3 /* Cocoa.framework in Frameworks */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXFrameworksBuildPhase section */

/* Begin PBXGroup section */
		C4E6187C095A3C800012CA3F = {
			isa = PBXGroup;
			children = (
				D0FDF9B709941656008E4F6B /* Grabba.cpp */,
				7EF3705016F29C72002A3CB3 /* Grabba.h */,
				D0FDF9B509941656008E4F6B /* Grabba_Strings.cpp */,
				7EF3705116F29C7C002A3CB3 /* Grabba_Strings.h */,
				D0FDF9B909941656008E4F6B /* Grabba_PiPL.r */,
				D0FE57630993C4FD00139A60 /* Supporting Code */,
				7EF36FFF16F29B86002A3CB3 /* Cocoa.framework */,
				C4E6188C095A3C800012CA3F /* Products */,
			);
			sourceTree = "<group>";
		};
		C4E6188C095A3C800012CA3F /* Products */ = {
			isa = PBXGroup;
			children = (
				C4E618CC095A3CE80012CA3F /* Grabba.plugin */,
			);
			name = Products;
			sourceTree = "<group>";
		};
		D0FE57630993C4FD00139A60 /* Supporting Code */ = {
			isa = PBXGroup;
			children = (
				D0FE579A0993C5E500139A60 /* AEGP_SuiteHandler.cpp */,
				D0FE579B0993C5E500139A60 /* AEGP_SuiteHandler.h */,
				D0FE579C0993C5E500139A60 /* MissingSuiteError.cpp */,
			);
			name = "Supporting Code";
			sourceTree = "<group>";
		};
/* End PBXGroup section */

/* Begin PBXNativeTarget section */
		C4E618CB095A3CE80012CA3F /* Grabba */ = {
			isa = PBXNativeTarget;
			buildConfigurationList = C4E618CE095A3CE90012CA3F /* Build configuration list for PBXNativeTarget "Grabba" */;
			buildPhases = (
				C4E618C9095A3CE80012CA3F /* Sources */,
				C4E618CA095A3CE80012CA3F /* Frameworks */,
				C4E618EA095A3E040012CA3F /* Rez */,
				D0445653099417B00073E055 /* Resources */,
			);
			buildRules = (
			);
			dependencies = (
			);
			name = Grabba;
			productName = Grabba.plugin;
			productReference = C4E618CC095A3CE80012CA3F /* Grabba.plugin */;
			productType = "com.apple.product-type.bundle";
		};
/* End PBXNativeTarget section */

/* Begin PBXProject section */
		C4E6187E095A3C800012CA3F /* Project object */ = {
			isa = PBXProject;
			attributes = {
				LastUpgradeCheck = 0720;
			};
			buildConfigurationList = C4E6187F095A3C800012CA3F /* Build configuration list for PBXProject "Grabba" */;
			compatibilityVersion = "Xcode 3.2";
			developmentRegion = English;
			hasScannedForEncodings = 0;
			knownRegions = (
				en,
			);
			mainGroup = C4E6187C095A3C800012CA3F;
			productRefGroup = C4E6188C095A3C800012CA3F /* Products */;
			projectDirPath = "";
			projectRoot = "";
			targets = (
				C4E618CB095A3CE80012CA3F /* Grabba */,
			);
		};
/* End PBXProject section */

/* Begin PBXResourcesBuildPhase section */
		D0445653099417B00073E055 /* Resources */ = {
			isa = PBXResourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXResourcesBuildPhase section */

/* Begin PBXRezBuildPhase section */
		C4E618EA095A3E040012CA3F /* Rez */ = {
			isa = PBXRezBuildPhase;
			buildActionMask = 2147483647;
			files = (
				D0FDF9BC09941656008E4F6B /* Grabba_PiPL.r in Rez */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXRezBuildPhase section */

/* Begin PBXSourcesBuildPhase section */
		C4E618C9095A3CE80012CA3F /* Sources */ = {
			isa = PBXSourcesBuildPhase;
			buildActionMask = 2147483647;
			files = (
				D0FE579D0993C5E500139A60 /* AEGP_SuiteHandler.cpp in Sources */,
				D0FE579E0993C5E500139A60 /* MissingSuiteError.cpp in Sources */,
				D0FDF9BA09941656008E4F6B /* Grabba_Strings.cpp in Sources */,
				D0FDF9BB09941656008E4F6B /* Grabba.cpp in Sources */,
			);
			runOnlyForDeploymentPostprocessing = 0;
		};
/* End PBXSourcesBuildPhase section */

/* Begin XCBuildConfiguration section */
		C4E61880095A3C800012CA3F /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				COPY_PHASE_STRIP = NO;
				ENABLE_TESTABILITY = YES;
				GCC_INPUT_FILETYPE = sourcecode.cpp.objcpp;
				GCC_MODEL_TUNING = "";
				GCC_OPTIMIZATION_LEVEL = 0;
				GCC_PREFIX_HEADER = "$(SYSTEM_LIBRARY_DIR)/Frameworks/Cocoa.framework/Headers/Cocoa.h";
				GCC_REUSE_STRINGS = NO;
				GCC_SYMBOLS_PRIVATE_EXTERN = YES;
				GCC_THREADSAFE_STATICS = NO;
				GCC_WARN_ABOUT_MISSING_PROTOTYPES = YES;
				GCC_WARN_ABOUT_RETURN_TYPE = YES;
				GCC_WARN_CHECK_SWITCH_STATEMENTS = YES;
				GCC_WARN_EFFECTIVE_CPLUSPLUS_VIOLATIONS = NO;
				GCC_WARN_MISSING_PARENTHESES = YES;
				GCC_WARN_SHADOW = NO;
				GCC_WARN_UNKNOWN_PRAGMAS = YES;
				GCC_WARN_UNUSED_FUNCTION = YES;
				GCC_WARN_UNUSED_LABEL = YES;
				GCC_WARN_UNUSED_VARIABLE = YES;
				HEADER_SEARCH_PATHS = (
					../../../Headers,
					../../../Util,
					../../../Headers/SP,
					../../../Resources,
				);
				ONLY_ACTIVE_ARCH = YES;
				REZ_PREPROCESSOR_DEFINITIONS = __MACH__;
				SDKROOT = macosx;
				STRIP_INSTALLED_PRODUCT = NO;
				WRAPPER_EXTENSION = plugin;
			};
			name = Debug;
		};
		C4E618CF095A3CE90012CA3F /* Debug */ = {
			isa = XCBuildConfiguration;
			buildSettings = {
				COMBINE_HIDPI_IMAGES = YES;
				GCC_MODEL_TUNING = G5;
				GENERATE_PKGINFO_FILE = YES;
				INFOPLIST_FILE = "Grabba.plugin-Info.plist";
				INSTALL_PATH = "$(HOME)/Library/Bundles";
				PRODUCT_BUNDLE_IDENTIFIER = com.adobe.AfterEffects.Grabba;
				PRODUCT_NAME = Grabba;
				SDKROOT = macosx;
				ZERO_LINK = NO;
			};
			name = Debug;
		};
/* End XCBuildConfiguration section */

/* Begin XCConfigurationList section */
		C4E6187F095A3C800012CA3F /* Build configuration list for PBXProject "Grabba" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				C4E61880095A3C800012CA3F /* Debug */,
			);
			defaultConfigurationIsVisible = 1;
			defaultConfigurationName = Debug;
		};
		C4E618CE095A3CE90012CA3F /* Build configuration list for PBXNativeTarget "Grabba" */ = {
			isa = XCConfigurationList;
			buildConfigurations = (
				C4E618CF095A3CE90012CA3F /* Debug */,
			);
			defaultConfigurationIsVisible = 0;
			defaultConfigurationName = Debug;
		};
/* End XCConfigurationList section */
	};
	rootObject = C4E6187E095A3C800012CA3F /* Project object */;
}
````

## File: AEGP/Grabba/Mac/Grabba.plugin-Info.plist
````
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleExecutable</key>
	<string>Grabba</string>
	<key>CFBundleIdentifier</key>
	<string>$(PRODUCT_BUNDLE_IDENTIFIER)</string>
	<key>CFBundleInfoDictionaryVersion</key>
	<string>6.0</string>
	<key>CFBundleName</key>
	<string>Grabba</string>
	<key>CFBundlePackageType</key>
	<string>AEgx</string>
	<key>CFBundleSignature</key>
	<string>FXTC</string>
	<key>LSRequiresCarbon</key>
	<true/>
	<key>NSAppleScriptEnabled</key>
	<string>No</string>
	<key>NSHumanReadableCopyright</key>
	<string>© 1992-2006 Adobe Systems Incorporated</string>
</dict>
</plist>
````

## File: AEGP/Grabba/Win/x64/Debug/AEGP_SuiteHandler.sbr
````

````

## File: AEGP/Grabba/Win/x64/Debug/CSXUtils.sbr
````

````

## File: AEGP/Grabba/Win/x64/Debug/Grabba.aex.recipe
````
<?xml version="1.0" encoding="utf-8"?>
<Project>
  <ProjectOutputs>
    <ProjectOutput>
      <FullPath>C:\Program Files\Adobe\Adobe After Effects 2023\Support Files\Plug-ins\Effects\Grabba.aex</FullPath>
    </ProjectOutput>
  </ProjectOutputs>
  <ContentFiles />
  <SatelliteDlls />
  <NonRecipeFileRefs />
</Project>
````

## File: AEGP/Grabba/Win/CSXSUtils.h
````c
#pragma once
#include <minwindef.h>
#include <string>


#pragma once
enum EventScope {
	kEventScope_Global = 0,
	kEventScope_Application = 1,
	kEventScope_LastValue = 0x7FFFFFFF
};

enum EventErrorCode {
	kEventErrorCode_Success = 0,
	kEventErrorCode_OperationFailed = 1,
	kEventErrorCode_Unknown = 2,
	kEventErrorCode_LastValue = 0x7FFFFFFF
};

struct Event {
	const char* type;
	EventScope scope;
	const char* appId;
	const char* extensionId;
	const char* data;
};

typedef int (*PlugPlugDispatchEventFn)(Event*);
typedef void (*EventListenerFn)(const Event* const event, void* const context);


extern HMODULE hModule;
HMODULE LoadDLL(std::string fileName);
int SendEvent(const char* EventType, const char* TargetApp, const char* ExtensionID, const char* Data);
EventErrorCode DispatchAdobeEvent(const char* type, const char* appId, const char* extensionId, const char* data);
int RegisterEventListener(const char* type);
````

## File: AEGP/Grabba/Win/Grabba_PiPL.rc
````
16000  PiPL  DISCARDABLE
BEGIN
	0x0001,	 
	0, 0x0, 	
	5, 0x0, 
	"MIB8",
	"dnik", 
	0, 0x0,
	4, 0x0,
	"xgEA",

	"MIB8",
	"eman",
	0, 0x0,
	8, 0x0,
	"\x06Grabba\0", 

	"MIB8",
	"gtac", 
	0, 0x0,
	16, 0x0,
	"\x0EGeneral Plugin\0", 

	"MIB8",
	"srev", 
	0, 0x0,
	4, 0x0,
	0, 3, 

	"MIB8",
	"4668", 
	0, 0x0,
	16, 0x0,
	"EntryPointFunc\0\0", 


END
````

## File: AEGP/Grabba/Win/Grabba.sln
````
Microsoft Visual Studio Solution File, Format Version 11.00
# Visual Studio 2010
Project("{8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942}") = "Grabba", "Grabba.vcxproj", "{F92835DD-4FE4-4F57-A439-B7EA704933DF}"
EndProject
Global
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|x64 = Debug|x64
		Release|x64 = Release|x64
	EndGlobalSection
	GlobalSection(ProjectConfigurationPlatforms) = postSolution
		{F92835DD-4FE4-4F57-A439-B7EA704933DF}.Debug|x64.ActiveCfg = Debug|x64
		{F92835DD-4FE4-4F57-A439-B7EA704933DF}.Debug|x64.Build.0 = Debug|x64
		{F92835DD-4FE4-4F57-A439-B7EA704933DF}.Release|x64.ActiveCfg = Release|x64
		{F92835DD-4FE4-4F57-A439-B7EA704933DF}.Release|x64.Build.0 = Release|x64
	EndGlobalSection
	GlobalSection(SolutionProperties) = preSolution
		HideSolutionNode = FALSE
	EndGlobalSection
EndGlobal
````

## File: AEGP/Grabba/Win/Grabba.vcxproj
````
<?xml version="1.0" encoding="utf-8"?>
<Project DefaultTargets="Build" ToolsVersion="14.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <ItemGroup Label="ProjectConfigurations">
    <ProjectConfiguration Include="Debug|Win32">
      <Configuration>Debug</Configuration>
      <Platform>Win32</Platform>
    </ProjectConfiguration>
    <ProjectConfiguration Include="Debug|x64">
      <Configuration>Debug</Configuration>
      <Platform>x64</Platform>
    </ProjectConfiguration>
    <ProjectConfiguration Include="Release|Win32">
      <Configuration>Release</Configuration>
      <Platform>Win32</Platform>
    </ProjectConfiguration>
    <ProjectConfiguration Include="Release|x64">
      <Configuration>Release</Configuration>
      <Platform>x64</Platform>
    </ProjectConfiguration>
  </ItemGroup>
  <PropertyGroup Label="Globals">
    <ProjectGuid>{F92835DD-4FE4-4F57-A439-B7EA704933DF}</ProjectGuid>
    <RootNamespace>Grabba</RootNamespace>
    <WindowsTargetPlatformVersion>10.0</WindowsTargetPlatformVersion>
  </PropertyGroup>
  <Import Project="$(VCTargetsPath)\Microsoft.Cpp.Default.props" />
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <UseOfMfc>false</UseOfMfc>
    <PlatformToolset>v143</PlatformToolset>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|Win32'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <UseOfMfc>false</UseOfMfc>
    <PlatformToolset>v143</PlatformToolset>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <UseOfMfc>false</UseOfMfc>
    <PlatformToolset>v143</PlatformToolset>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <UseOfMfc>false</UseOfMfc>
    <PlatformToolset>v143</PlatformToolset>
  </PropertyGroup>
  <Import Project="$(VCTargetsPath)\Microsoft.Cpp.props" />
  <ImportGroup Label="ExtensionSettings">
  </ImportGroup>
  <ImportGroup Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'" Label="PropertySheets">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
    <Import Project="$(VCTargetsPath)Microsoft.CPP.UpgradeFromVC71.props" />
  </ImportGroup>
  <ImportGroup Condition="'$(Configuration)|$(Platform)'=='Release|Win32'" Label="PropertySheets">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
    <Import Project="$(VCTargetsPath)Microsoft.CPP.UpgradeFromVC71.props" />
  </ImportGroup>
  <ImportGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" Label="PropertySheets">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
    <Import Project="$(VCTargetsPath)Microsoft.CPP.UpgradeFromVC71.props" />
  </ImportGroup>
  <ImportGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'" Label="PropertySheets">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
    <Import Project="$(VCTargetsPath)Microsoft.CPP.UpgradeFromVC71.props" />
  </ImportGroup>
  <PropertyGroup Label="UserMacros" />
  <PropertyGroup>
    <_ProjectFileVersion>10.0.40219.1</_ProjectFileVersion>
    <OutDir Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">C:\Program Files\Adobe\Adobe After Effects 2023\Support Files\Plug-ins\Effects</OutDir>
    <OutDir Condition="'$(Configuration)|$(Platform)'=='Release|x64'">C:\Program Files\Adobe\Adobe After Effects 2023\Support Files\Plug-ins\Effects</OutDir>
    <IntDir Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">$(Platform)\$(Configuration)\</IntDir>
    <IntDir Condition="'$(Configuration)|$(Platform)'=='Release|x64'">$(Platform)\$(Configuration)\</IntDir>
    <IgnoreImportLibrary Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">true</IgnoreImportLibrary>
    <IgnoreImportLibrary Condition="'$(Configuration)|$(Platform)'=='Release|x64'">true</IgnoreImportLibrary>
    <OutDir Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">$(AE_PLUGIN_BUILD_DIR)\AEGP\</OutDir>
    <OutDir Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">$(AE_PLUGIN_BUILD_DIR)\AEGP\</OutDir>
    <IntDir Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">$(Platform)\$(Configuration)\</IntDir>
    <IntDir Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">$(Platform)\$(Configuration)\</IntDir>
    <IgnoreImportLibrary Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">true</IgnoreImportLibrary>
    <IgnoreImportLibrary Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">true</IgnoreImportLibrary>
    <CodeAnalysisRuleSet Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">AllRules.ruleset</CodeAnalysisRuleSet>
    <CodeAnalysisRuleSet Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">AllRules.ruleset</CodeAnalysisRuleSet>
    <CodeAnalysisRules Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'" />
    <CodeAnalysisRules Condition="'$(Configuration)|$(Platform)'=='Release|Win32'" />
    <CodeAnalysisRuleAssemblies Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'" />
    <CodeAnalysisRuleAssemblies Condition="'$(Configuration)|$(Platform)'=='Release|Win32'" />
    <CodeAnalysisRuleSet Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">AllRules.ruleset</CodeAnalysisRuleSet>
    <CodeAnalysisRuleSet Condition="'$(Configuration)|$(Platform)'=='Release|x64'">AllRules.ruleset</CodeAnalysisRuleSet>
    <CodeAnalysisRules Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" />
    <CodeAnalysisRules Condition="'$(Configuration)|$(Platform)'=='Release|x64'" />
    <CodeAnalysisRuleAssemblies Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" />
    <CodeAnalysisRuleAssemblies Condition="'$(Configuration)|$(Platform)'=='Release|x64'" />
    <TargetExt Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">.aex</TargetExt>
    <TargetExt Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">.aex</TargetExt>
    <TargetExt Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">.aex</TargetExt>
    <TargetExt Condition="'$(Configuration)|$(Platform)'=='Release|x64'">.aex</TargetExt>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <IncludePath>C:\Users\tjerf\vcpkg\installed\x64-windows-static\include;$(IncludePath)</IncludePath>
    <ExternalIncludePath>$(ExternalIncludePath)</ExternalIncludePath>
    <LibraryPath>C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib;$(LibraryPath)</LibraryPath>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <IncludePath>C:\Users\tjerf\vcpkg\installed\x64-windows-static\include;$(IncludePath)</IncludePath>
    <ExternalIncludePath>$(ExternalIncludePath)</ExternalIncludePath>
    <LibraryPath>C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib;$(LibraryPath)</LibraryPath>
  </PropertyGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <Midl>
      <PreprocessorDefinitions>_DEBUG;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <MkTypLibCompatible>true</MkTypLibCompatible>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <TargetEnvironment>X64</TargetEnvironment>
      <TypeLibraryName>.\Debug/Grabba.tlb</TypeLibraryName>
      <HeaderFileName>
      </HeaderFileName>
    </Midl>
    <ClCompile>
      <Optimization>Disabled</Optimization>
      <AdditionalIncludeDirectories>C:\Users\tjerf\vcpkg\installed\x64-windows-static\include;..\..\..\Headers;..\..\..\Headers\SP;..\..\..\Headers\Win;..\..\..\Resources;..\..\..\Util;%(AdditionalIncludeDirectories)</AdditionalIncludeDirectories>
      <PreprocessorDefinitions>MSWindows;WIN32;_DEBUG;_WINDOWS;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <RuntimeLibrary>MultiThreadedDebug</RuntimeLibrary>
      <StructMemberAlignment>Default</StructMemberAlignment>
      <PrecompiledHeader>
      </PrecompiledHeader>
      <PrecompiledHeaderFile>AE_Effect.h</PrecompiledHeaderFile>
      <PrecompiledHeaderOutputFile>$(IntDir)$(TargetName).pch</PrecompiledHeaderOutputFile>
      <AssemblerOutput>NoListing</AssemblerOutput>
      <AssemblerListingLocation>$(IntDir)</AssemblerListingLocation>
      <ObjectFileName>$(IntDir)</ObjectFileName>
      <ProgramDataBaseFileName>$(IntDir)vc$(PlatformToolsetVersion).pdb</ProgramDataBaseFileName>
      <BrowseInformation>true</BrowseInformation>
      <WarningLevel>Level3</WarningLevel>
      <TreatWarningAsError>false</TreatWarningAsError>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <DebugInformationFormat>ProgramDatabase</DebugInformationFormat>
      <CompileAs>Default</CompileAs>
      <LanguageStandard>stdcpp17</LanguageStandard>
    </ClCompile>
    <ResourceCompile>
      <PreprocessorDefinitions>_DEBUG;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <Culture>0x0409</Culture>
    </ResourceCompile>
    <Link>
      <OutputFile>$(OutDir)$(TargetName)$(TargetExt)</OutputFile>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <ProgramDatabaseFile>$(IntDir)$(TargetName).pdb</ProgramDatabaseFile>
      <SubSystem>
      </SubSystem>
      <RandomizedBaseAddress>false</RandomizedBaseAddress>
      <DataExecutionPrevention>
      </DataExecutionPrevention>
      <ImportLibrary>$(IntDir)/$(TargetName).lib</ImportLibrary>
      <TargetMachine>MachineX64</TargetMachine>
      <AdditionalDependencies>"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_highgui4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_imgcodecs4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_imgproc4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_ml4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_objdetect4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_photo4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_stitching4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_video4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_videoio4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\quirc.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\tiffd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\turbojpeg.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\zlibd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\zstd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\jpeg.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libexpatdMT.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libpng16d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libprotobufd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libprotobuf-lited.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libprotocd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libsharpyuv.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libwebp.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libwebpdecoder.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libwebpdemux.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libwebpmux.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\lzma.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_calib3d4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_core4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_dnn4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_features2d4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_flann4d.lib";%(AdditionalDependencies)</AdditionalDependencies>
      <AdditionalLibraryDirectories>C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib;C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib</AdditionalLibraryDirectories>
    </Link>
    <Bscmake>
      <OutputFile>$(IntDir)$(TargetName).bsc</OutputFile>
    </Bscmake>
  </ItemDefinitionGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <Midl>
      <PreprocessorDefinitions>_DEBUG;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <MkTypLibCompatible>true</MkTypLibCompatible>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <TargetEnvironment>X64</TargetEnvironment>
      <TypeLibraryName>.\Debug/Grabba.tlb</TypeLibraryName>
      <HeaderFileName>
      </HeaderFileName>
    </Midl>
    <ClCompile>
      <Optimization>MaxSpeed</Optimization>
      <AdditionalIncludeDirectories>C:\Users\tjerf\vcpkg\installed\x64-windows-static\include;..\..\..\Headers;..\..\..\Headers\SP;..\..\..\Headers\Win;..\..\..\Resources;..\..\..\Util;%(AdditionalIncludeDirectories)</AdditionalIncludeDirectories>
      <PreprocessorDefinitions>MSWindows;WIN32;_WINDOWS;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <RuntimeLibrary>MultiThreadedDebug</RuntimeLibrary>
      <StructMemberAlignment>Default</StructMemberAlignment>
      <PrecompiledHeader>
      </PrecompiledHeader>
      <PrecompiledHeaderFile>AE_Effect.h</PrecompiledHeaderFile>
      <PrecompiledHeaderOutputFile>$(IntDir)$(TargetName).pch</PrecompiledHeaderOutputFile>
      <AssemblerOutput>NoListing</AssemblerOutput>
      <AssemblerListingLocation>$(IntDir)</AssemblerListingLocation>
      <ObjectFileName>$(IntDir)</ObjectFileName>
      <ProgramDataBaseFileName>$(IntDir)vc$(PlatformToolsetVersion).pdb</ProgramDataBaseFileName>
      <BrowseInformation>true</BrowseInformation>
      <WarningLevel>Level3</WarningLevel>
      <TreatWarningAsError>false</TreatWarningAsError>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <DebugInformationFormat>ProgramDatabase</DebugInformationFormat>
      <CompileAs>Default</CompileAs>
      <LanguageStandard>stdcpp17</LanguageStandard>
    </ClCompile>
    <ResourceCompile>
      <PreprocessorDefinitions>%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <Culture>0x0409</Culture>
    </ResourceCompile>
    <Link>
      <OutputFile>$(OutDir)$(TargetName)$(TargetExt)</OutputFile>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <GenerateDebugInformation>
      </GenerateDebugInformation>
      <ProgramDatabaseFile>$(IntDir)$(TargetName).pdb</ProgramDatabaseFile>
      <SubSystem>
      </SubSystem>
      <RandomizedBaseAddress>false</RandomizedBaseAddress>
      <DataExecutionPrevention>
      </DataExecutionPrevention>
      <ImportLibrary>$(IntDir)/$(TargetName).lib</ImportLibrary>
      <TargetMachine>MachineX64</TargetMachine>
      <AdditionalDependencies>"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_highgui4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_imgcodecs4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_imgproc4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_ml4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_objdetect4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_photo4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_stitching4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_video4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_videoio4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\quirc.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\tiffd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\turbojpeg.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\zlibd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\zstd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\jpeg.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libexpatdMT.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libpng16d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libprotobufd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libprotobuf-lited.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libprotocd.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libsharpyuv.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libwebp.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libwebpdecoder.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libwebpdemux.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\libwebpmux.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\lzma.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_calib3d4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_core4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_dnn4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_features2d4d.lib";"C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib\opencv_flann4d.lib";%(AdditionalDependencies)</AdditionalDependencies>
      <AdditionalLibraryDirectories>C:\Users\tjerf\vcpkg\installed\x64-windows-static\debug\lib;C:\Users\tjerf\vcpkg\installed\x64-windows-static\lib</AdditionalLibraryDirectories>
    </Link>
    <Bscmake>
      <OutputFile>$(IntDir)$(TargetName).bsc</OutputFile>
    </Bscmake>
  </ItemDefinitionGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">
    <Midl>
      <PreprocessorDefinitions>_DEBUG;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <MkTypLibCompatible>true</MkTypLibCompatible>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <TargetEnvironment>X64</TargetEnvironment>
      <TypeLibraryName>.\Debug/Grabba.tlb</TypeLibraryName>
      <HeaderFileName>
      </HeaderFileName>
    </Midl>
    <ClCompile>
      <Optimization>Disabled</Optimization>
      <AdditionalIncludeDirectories>..\..\..\Headers;..\..\..\Headers\SP;..\..\..\Headers\Win;..\..\..\Resources;..\..\..\Util;%(AdditionalIncludeDirectories)</AdditionalIncludeDirectories>
      <PreprocessorDefinitions>MSWindows;WIN32;_DEBUG;_WINDOWS;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <RuntimeLibrary>MultiThreadedDebugDLL</RuntimeLibrary>
      <StructMemberAlignment>Default</StructMemberAlignment>
      <PrecompiledHeader>
      </PrecompiledHeader>
      <PrecompiledHeaderFile>AE_Effect.h</PrecompiledHeaderFile>
      <PrecompiledHeaderOutputFile>$(IntDir)$(TargetName).pch</PrecompiledHeaderOutputFile>
      <AssemblerOutput>NoListing</AssemblerOutput>
      <AssemblerListingLocation>$(IntDir)</AssemblerListingLocation>
      <ObjectFileName>$(IntDir)</ObjectFileName>
      <ProgramDataBaseFileName>$(IntDir)vc$(PlatformToolsetVersion).pdb</ProgramDataBaseFileName>
      <BrowseInformation>true</BrowseInformation>
      <WarningLevel>Level3</WarningLevel>
      <TreatWarningAsError>true</TreatWarningAsError>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <DebugInformationFormat>ProgramDatabase</DebugInformationFormat>
      <CompileAs>Default</CompileAs>
    </ClCompile>
    <ResourceCompile>
      <PreprocessorDefinitions>_DEBUG;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <Culture>0x0409</Culture>
    </ResourceCompile>
    <Link>
      <OutputFile>$(OutDir)$(TargetName)$(TargetExt)</OutputFile>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <ProgramDatabaseFile>$(IntDir)$(TargetName).pdb</ProgramDatabaseFile>
      <SubSystem>
      </SubSystem>
      <RandomizedBaseAddress>false</RandomizedBaseAddress>
      <DataExecutionPrevention>
      </DataExecutionPrevention>
      <ImportLibrary>$(IntDir)/$(TargetName).lib</ImportLibrary>
      <TargetMachine>MachineX86</TargetMachine>
    </Link>
    <Bscmake>
      <OutputFile>$(IntDir)$(TargetName).bsc</OutputFile>
    </Bscmake>
  </ItemDefinitionGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">
    <Midl>
      <PreprocessorDefinitions>_DEBUG;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <MkTypLibCompatible>true</MkTypLibCompatible>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <TargetEnvironment>X64</TargetEnvironment>
      <TypeLibraryName>.\Debug/Grabba.tlb</TypeLibraryName>
      <HeaderFileName>
      </HeaderFileName>
    </Midl>
    <ClCompile>
      <Optimization>MaxSpeed</Optimization>
      <AdditionalIncludeDirectories>..\..\..\Headers;..\..\..\Headers\SP;..\..\..\Headers\Win;..\..\..\Resources;..\..\..\Util;%(AdditionalIncludeDirectories)</AdditionalIncludeDirectories>
      <PreprocessorDefinitions>MSWindows;WIN32;_WINDOWS;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <RuntimeLibrary>MultiThreadedDLL</RuntimeLibrary>
      <StructMemberAlignment>Default</StructMemberAlignment>
      <PrecompiledHeader>
      </PrecompiledHeader>
      <PrecompiledHeaderFile>AE_Effect.h</PrecompiledHeaderFile>
      <PrecompiledHeaderOutputFile>$(IntDir)$(TargetName).pch</PrecompiledHeaderOutputFile>
      <AssemblerOutput>NoListing</AssemblerOutput>
      <AssemblerListingLocation>$(IntDir)</AssemblerListingLocation>
      <ObjectFileName>$(IntDir)</ObjectFileName>
      <ProgramDataBaseFileName>$(IntDir)vc$(PlatformToolsetVersion).pdb</ProgramDataBaseFileName>
      <BrowseInformation>true</BrowseInformation>
      <WarningLevel>Level3</WarningLevel>
      <TreatWarningAsError>true</TreatWarningAsError>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <DebugInformationFormat>ProgramDatabase</DebugInformationFormat>
      <CompileAs>Default</CompileAs>
    </ClCompile>
    <ResourceCompile>
      <PreprocessorDefinitions>%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <Culture>0x0409</Culture>
    </ResourceCompile>
    <Link>
      <OutputFile>$(OutDir)$(TargetName)$(TargetExt)</OutputFile>
      <SuppressStartupBanner>true</SuppressStartupBanner>
      <GenerateDebugInformation>
      </GenerateDebugInformation>
      <ProgramDatabaseFile>$(IntDir)$(TargetName).pdb</ProgramDatabaseFile>
      <SubSystem>
      </SubSystem>
      <RandomizedBaseAddress>false</RandomizedBaseAddress>
      <DataExecutionPrevention>
      </DataExecutionPrevention>
      <ImportLibrary>$(IntDir)/$(TargetName).lib</ImportLibrary>
      <TargetMachine>MachineX86</TargetMachine>
    </Link>
    <Bscmake>
      <OutputFile>$(IntDir)$(TargetName).bsc</OutputFile>
    </Bscmake>
  </ItemDefinitionGroup>
  <ItemGroup>
    <ClInclude Include="..\cbase64.h" />
    <ClInclude Include="..\Grabba.h" />
    <ClInclude Include="..\Grabba_Strings.h" />
    <ClInclude Include="..\..\..\Headers\A.h" />
    <ClInclude Include="..\..\..\Headers\AE_AdvEffectSuites.h" />
    <ClInclude Include="..\..\..\Headers\AE_Effect.h" />
    <ClInclude Include="..\..\..\Headers\AE_EffectCB.h" />
    <ClInclude Include="..\..\..\Headers\AE_EffectCBSuites.h" />
    <ClInclude Include="..\..\..\Headers\AE_EffectSuites.h" />
    <ClInclude Include="..\..\..\Headers\AE_EffectSuitesHelper.h" />
    <ClInclude Include="..\..\..\Headers\AE_EffectUI.h" />
    <ClInclude Include="..\..\..\Headers\AE_GeneralPlug.h" />
    <ClInclude Include="..\..\..\Headers\AE_GeneralPlugOld.h" />
    <ClInclude Include="..\..\..\Headers\AE_Hook.h" />
    <ClInclude Include="..\..\..\Headers\AE_IO.h" />
    <ClInclude Include="..\..\..\Headers\AE_Macros.h" />
    <ClInclude Include="..\..\..\Util\AEGP_SuiteHandler.h" />
    <ClInclude Include="..\..\..\Util\entry.h" />
    <ClInclude Include="..\..\..\Headers\FIEL_Public.h" />
    <ClInclude Include="..\..\..\Headers\PF_Masks.h" />
    <ClInclude Include="..\..\..\Headers\PR_Public.h" />
    <ClInclude Include="..\..\..\Util\String_Utils.h" />
    <ClInclude Include="CSXSUtils.h" />
  </ItemGroup>
  <ItemGroup>
    <CustomBuild Include="..\Grabba_PiPL.r">
      <Message Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">Compiling the PiPL</Message>
      <Message Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">Compiling the PiPL</Message>
      <Command Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">cl /I "$(ProjectDir)..\..\..\Headers" /EP ".."\\"%(Filename).r" &gt; "$(IntDir)"\\"%(Filename).rr"
"$(ProjectDir)..\..\..\Resources\PiPLTool" "$(IntDir)%(Filename).rr" "$(IntDir)%(Filename).rrc"
cl /D "MSWindows" /EP $(IntDir)%(Filename).rrc &gt;               "$(ProjectDir)"\\"%(Filename)".rc
</Command>
      <Command Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">cl /I "$(ProjectDir)..\..\..\Headers" /EP ".."\\"%(Filename).r" &gt; "$(IntDir)"\\"%(Filename).rr"
"$(ProjectDir)..\..\..\Resources\PiPLTool" "$(IntDir)%(Filename).rr" "$(IntDir)%(Filename).rrc"
cl /D "MSWindows" /EP $(IntDir)%(Filename).rrc &gt;               "$(ProjectDir)"\\"%(Filename)".rc
</Command>
      <Outputs Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">$(ProjectDir)%(Filename).rc;%(Outputs)</Outputs>
      <Outputs Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">$(ProjectDir)%(Filename).rc;%(Outputs)</Outputs>
      <Message Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">Compiling the PiPL</Message>
      <Message Condition="'$(Configuration)|$(Platform)'=='Release|x64'">Compiling the PiPL</Message>
      <Command Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">cl /I "$(ProjectDir)..\..\..\Headers" /EP ".."\\"%(Filename).r" &gt; "$(IntDir)"\\"%(Filename).rr"
"$(ProjectDir)..\..\..\Resources\PiPLTool" "$(IntDir)%(Filename).rr" "$(IntDir)%(Filename).rrc"
cl /D "MSWindows" /EP $(IntDir)%(Filename).rrc &gt;               "$(ProjectDir)"\\"%(Filename)".rc
</Command>
      <Command Condition="'$(Configuration)|$(Platform)'=='Release|x64'">cl /I "$(ProjectDir)..\..\..\Headers" /EP ".."\\"%(Filename).r" &gt; "$(IntDir)"\\"%(Filename).rr"
"$(ProjectDir)..\..\..\Resources\PiPLTool" "$(IntDir)%(Filename).rr" "$(IntDir)%(Filename).rrc"
cl /D "MSWindows" /EP $(IntDir)%(Filename).rrc &gt;               "$(ProjectDir)"\\"%(Filename)".rc
</Command>
      <Outputs Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">$(ProjectDir)%(Filename).rc;%(Outputs)</Outputs>
      <Outputs Condition="'$(Configuration)|$(Platform)'=='Release|x64'">$(ProjectDir)%(Filename).rc;%(Outputs)</Outputs>
    </CustomBuild>
  </ItemGroup>
  <ItemGroup>
    <ResourceCompile Include="Grabba_PiPL.rc" />
  </ItemGroup>
  <ItemGroup>
    <ClCompile Include="..\..\..\Util\AEGP_SuiteHandler.cpp" />
    <ClCompile Include="..\..\..\Util\MissingSuiteError.cpp" />
    <ClCompile Include="..\CSXUtils.cpp" />
    <ClCompile Include="..\Grabba_Strings.cpp" />
    <ClCompile Include="..\Grabba.cpp" />
  </ItemGroup>
  <Import Project="$(VCTargetsPath)\Microsoft.Cpp.targets" />
  <ImportGroup Label="ExtensionTargets">
  </ImportGroup>
</Project>
````

## File: AEGP/Grabba/Win/Grabba.vcxproj.filters
````
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <ItemGroup>
    <Filter Include="Headers">
      <UniqueIdentifier>{7bce3b0c-2859-4fc2-9004-53c6dd90b22c}</UniqueIdentifier>
      <Extensions>h;hpp;hxx;hm;inl;fi;fd</Extensions>
    </Filter>
    <Filter Include="Headers\AE">
      <UniqueIdentifier>{12a44093-29c6-4a9a-9130-74bebe3681a4}</UniqueIdentifier>
    </Filter>
    <Filter Include="Resources">
      <UniqueIdentifier>{71490440-ef5a-48eb-a239-11d1e05a7260}</UniqueIdentifier>
      <Extensions>ico;cur;bmp;dlg;rc2;rct;bin;cnt;rtf;gif;jpg;jpeg;jpe</Extensions>
    </Filter>
    <Filter Include="Supporting Code">
      <UniqueIdentifier>{8beaf83a-c0ff-4de3-9165-e79e4ff269f9}</UniqueIdentifier>
    </Filter>
  </ItemGroup>
  <ItemGroup>
    <ClInclude Include="..\Grabba.h">
      <Filter>Headers</Filter>
    </ClInclude>
    <ClInclude Include="..\Grabba_Strings.h">
      <Filter>Headers</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\A.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_AdvEffectSuites.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_Effect.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_EffectCB.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_EffectCBSuites.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_EffectSuites.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_EffectSuitesHelper.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_EffectUI.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_GeneralPlug.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_GeneralPlugOld.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_Hook.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_IO.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\AE_Macros.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Util\AEGP_SuiteHandler.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Util\entry.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\FIEL_Public.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\PF_Masks.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Headers\PR_Public.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\..\..\Util\String_Utils.h">
      <Filter>Headers\AE</Filter>
    </ClInclude>
    <ClInclude Include="..\cbase64.h">
      <Filter>Headers</Filter>
    </ClInclude>
    <ClInclude Include="CSXSUtils.h">
      <Filter>Headers</Filter>
    </ClInclude>
  </ItemGroup>
  <ItemGroup>
    <ResourceCompile Include="Grabba_PiPL.rc">
      <Filter>Resources</Filter>
    </ResourceCompile>
  </ItemGroup>
  <ItemGroup>
    <ClCompile Include="..\..\..\Util\AEGP_SuiteHandler.cpp">
      <Filter>Supporting Code</Filter>
    </ClCompile>
    <ClCompile Include="..\Grabba.cpp" />
    <ClCompile Include="..\Grabba_Strings.cpp" />
    <ClCompile Include="..\..\..\Util\MissingSuiteError.cpp">
      <Filter>Supporting Code</Filter>
    </ClCompile>
    <ClCompile Include="..\CSXUtils.cpp" />
  </ItemGroup>
  <ItemGroup>
    <CustomBuild Include="..\Grabba_PiPL.r">
      <Filter>Resources</Filter>
    </CustomBuild>
  </ItemGroup>
</Project>
````

## File: AEGP/Grabba/Win/Grabba.vcxproj.user
````
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="Current" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <LocalDebuggerCommand>"C:\Program Files\Adobe\Adobe After Effects 2023\Support Files\AfterFX.exe"</LocalDebuggerCommand>
    <DebuggerFlavor>WindowsLocalDebugger</DebuggerFlavor>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <LocalDebuggerCommand>"C:\Program Files\Adobe\Adobe After Effects 2023\Support Files\AfterFX.exe"</LocalDebuggerCommand>
    <DebuggerFlavor>WindowsLocalDebugger</DebuggerFlavor>
  </PropertyGroup>
</Project>
````

## File: AEGP/Grabba/cbase64.h
````c
#ifndef CBASE64_H
#define CBASE64_H

#ifdef __cplusplus
extern "C" {
#endif

typedef enum
{
    step_A, step_B, step_C, step_D
} cbase64_step;

typedef struct
{
    cbase64_step step;
    unsigned char result;
} cbase64_encodestate;

typedef struct
{
    cbase64_step step;
    char result;
} cbase64_decodestate;

void cbase64_init_encodestate(cbase64_encodestate* state_in);
void cbase64_init_decodestate(cbase64_decodestate* state_in);

unsigned int cbase64_calc_encoded_length(unsigned int length_in);
unsigned int cbase64_calc_decoded_length(const char* code_in, unsigned int length_in);

unsigned int cbase64_encode_block(const unsigned char* data_in, unsigned int length_in,
                                  char* code_out, cbase64_encodestate* state_in);

unsigned int cbase64_decode_block(const char* code_in, unsigned int length_in,
                                  unsigned char* data_out, cbase64_decodestate* state_in);

unsigned int cbase64_encode_blockend(char* code_out, cbase64_encodestate* state_in);

#ifdef __cplusplus
}
#endif

#endif

#ifdef CBASE64_IMPLEMENTATION

char cbase64__encode_value(unsigned char value_in)
{
    static const char* encoding = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    return encoding[(int)value_in];
}

char cbase64__decode_value(char value_in)
{
    static const char decoding[] = {62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,-2,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51};
    static const char decoding_size = sizeof(decoding);
    value_in -= 43;
    if (value_in < 0 || value_in >= decoding_size) return -1;
    return decoding[(int)value_in];
}

void cbase64_init_encodestate(cbase64_encodestate* state_in)
{
    state_in->step = step_A;
    state_in->result = '\0';
}

void cbase64_init_decodestate(cbase64_decodestate* state_in)
{
    state_in->step = step_A;
    state_in->result = '\0';
}

unsigned int cbase64_calc_encoded_length(unsigned int length_in)
{
    return 4 * (length_in / 3) + ((length_in % 3 != 0) ? 4 : 0);
}

unsigned int cbase64_calc_decoded_length(const char* code_in, unsigned int length_in)
{
    if (length_in == 0 || ((length_in & 3) != 0))
    {
        return 0;
    }
    const char secondlast = code_in[length_in - 2];
    const char last = code_in[length_in - 1];
    return 3 * (length_in / 4) - (secondlast == '=') - (last == '=');
}

unsigned int cbase64_encode_block(const unsigned char* data_in, unsigned int length_in,
                                  char* code_out, cbase64_encodestate* state_in)
{
    const unsigned char* datachar = data_in;
    const unsigned char* const datatextend = data_in + length_in;
    char* codechar = code_out;
    unsigned char result = state_in->result;
    unsigned char fragment;

    switch (state_in->step)
    {
        for (;;)
        {
    case step_A:
            if (datachar == datatextend)
            {
                state_in->step = step_A;
                state_in->result = result;
                return codechar - code_out;
            }
            fragment = *datachar++;
            result = (fragment & 0x0fc) >> 2;
            *codechar++ = cbase64__encode_value(result);
            result = (fragment & 0x003) << 4;
    case step_B:
            if (datachar == datatextend)
            {
                state_in->step = step_B;
                state_in->result = result;
                return codechar - code_out;
            }
            fragment = *datachar++;
            result |= (fragment & 0x0f0) >> 4;
            *codechar++ = cbase64__encode_value(result);
            result = (fragment & 0x00f) << 2;
    case step_C:
            if (datachar == datatextend)
            {
                state_in->step = step_C;
                state_in->result = result;
                return codechar - code_out;
            }
            fragment = *datachar++;
            result |= (fragment & 0x0c0) >> 6;
            *codechar++ = cbase64__encode_value(result);
            result  = (fragment & 0x03f) >> 0;
            *codechar++ = cbase64__encode_value(result);
        }
    }

    return codechar - code_out;
}

unsigned int cbase64_decode_block(const char* code_in, unsigned int length_in,
                                  unsigned char* data_out, cbase64_decodestate* state_in)
{
    const char* codechar = code_in;
    const char* const codeend = code_in + length_in;
    unsigned char* datachar = data_out;
    char fragment;
    char overwrite = state_in->result;

    switch (state_in->step)
    {
        for (;;)
        {
    case step_A:
            do {
                if (codechar == codeend)
                {
                    state_in->step = step_A;
                    state_in->result = overwrite;
                    return datachar - data_out;
                }
                fragment = cbase64__decode_value(*codechar++);
            } while (fragment < 0);
            *datachar = (fragment & 0x03f) << 2;
    case step_B:
            do {
                if (codechar == codeend)
                {
                    state_in->step = step_B;
                    state_in->result = overwrite;
                    return datachar - data_out;
                }
                fragment = cbase64__decode_value(*codechar++);
            } while (fragment < 0);
            *datachar++ |= (fragment & 0x030) >> 4;
            overwrite    = (fragment & 0x00f) << 4;
    case step_C:
            do {
                if (codechar == codeend)
                {
                    state_in->step = step_C;
                    state_in->result = overwrite;
                    return datachar - data_out;
                }
                fragment = cbase64__decode_value(*codechar++);
            } while (fragment < 0);
            *datachar++ = overwrite | (fragment & 0x03c) >> 2;
            overwrite   = (fragment & 0x003) << 6;
    case step_D:
            do {
                if (codechar == codeend)
                {
                    state_in->step = step_D;
                    state_in->result = overwrite;
                    return datachar - data_out;
                }
                fragment = cbase64__decode_value(*codechar++);
            } while (fragment < 0);
            *datachar++ = overwrite | (fragment & 0x03f);
        }
    }

    return datachar - data_out;
}

unsigned int cbase64_encode_blockend(char* code_out, cbase64_encodestate* state_in)
{
    char* codechar = code_out;
    switch (state_in->step)
    {
    case step_B:
        *codechar++ = cbase64__encode_value(state_in->result);
        *codechar++ = '=';
        *codechar++ = '=';
        break;
    case step_C:
        *codechar++ = cbase64__encode_value(state_in->result);
        *codechar++ = '=';
        break;
    case step_A:
        break;
    }
    return codechar - code_out;
}

#endif
````

## File: AEGP/Grabba/CSXUtils.cpp
````cpp
#include <windows.h>
#include <iostream>
#include "Win/CSXSUtils.h"


HMODULE hModule = NULL;


HMODULE LoadDLL(std::string DLLpath) {

    LPCSTR resultStr = DLLpath.c_str();

	hModule = LoadLibrary(resultStr);


	if (!hModule) {
		std::cerr << "Failed to load DLL." << std::endl;
		return NULL;
	}

	return hModule;
}


EventErrorCode DispatchAdobeEvent(const char* type, const char* appId, const char* extensionId, const char* data) {
	try {
		if (!hModule) {
			std::cerr << "Failed to load DLL." << std::endl;
			return kEventErrorCode_OperationFailed;
		}

		PlugPlugDispatchEventFn DispatchEvent = reinterpret_cast<PlugPlugDispatchEventFn>(GetProcAddress(hModule, "PlugPlugDispatchEvent"));

		Event my_event = {
			type,
			kEventScope_Application,
			appId,
			extensionId,
			data
		};

		EventErrorCode result = static_cast<EventErrorCode>(DispatchEvent(&my_event));


		return result;
	}
	catch (const std::exception& e) {
		std::cerr << "Exception: " << e.what() << std::endl;
		return kEventErrorCode_OperationFailed;
	}
}



int SendEvent(const char* EventType, const char* TargetApp, const char* ExtensionID, const char* Data) {
	EventErrorCode result = DispatchAdobeEvent(EventType, TargetApp, ExtensionID, Data);
	if (result == kEventErrorCode_Success) {
		std::cout << "Event dispatched successfully." << std::endl;
		return 1;
	}
	else {
		std::cerr << "Failed to dispatch event. Error code: " << result << std::endl;
		return 0;
	}
}


void MyEventListener(const Event* const event, void* const context) {
	std::cout << "Received event: " << event->type << std::endl;

	if (event->data) {
		if (strcmp(event->data, "Hello from JSX!") == 0) {
			std::cout << "Event data is correct." << std::endl;
			int res = SendEvent("com.adobe.csxs.events.MyCustomEvent", "AEFT", "getimg", "Hello from C++");
			if (res == kEventErrorCode_Success) {
				std::cout << "Event sent successfully." << std::endl;
			}
			else {
				std::cerr << "Failed to send event." << std::endl;
			}
		}
		else {
			std::cerr << "Event data is incorrect." << std::endl;
		}

	}
}



int RegisterEventListener(const char* EventType) {
	try {
	typedef EventErrorCode(*PlugPlugAddEventListenerFn)(const char*, const EventListenerFn, void* const);
	PlugPlugAddEventListenerFn AddEventListener = reinterpret_cast<PlugPlugAddEventListenerFn>(GetProcAddress(hModule, "PlugPlugAddEventListener"));



	EventErrorCode result = AddEventListener(EventType, MyEventListener, nullptr);


	if (result == kEventErrorCode_Success) {
		std::cout << "Event listener added successfully." << std::endl;
	}
	else {
		std::cerr << "Failed to add event listener. Error code: " << result << std::endl;
	}

	return 0;
}
catch (const std::exception& e) {
	std::cerr << "Exception: " << e.what() << std::endl;
	return 1;
}
}
````

## File: AEGP/Grabba/Grabba_PiPL.r
````r
#include "AEConfig.h"

#ifndef AE_OS_WIN
	#include "AE_General.r"
#endif
resource 'PiPL' (16000) {
	{	/* array properties: 7 elements */
		/* [1] */
		Kind {
			AEGP
		},
		/* [2] */
		Name {
			"Grabba"
		},
		/* [3] */
		Category {
			"General Plugin"
		},
		/* [4] */
		Version {
			196608
		},
#ifdef AE_OS_WIN
	#ifdef AE_PROC_INTELx64
		CodeWin64X86 {"EntryPointFunc"},
	#endif
#else
	#ifdef AE_OS_MAC
		CodeMacIntel64 {"EntryPointFunc"},
		CodeMacARM64 {"EntryPointFunc"},
	#endif
#endif
	}
};
````

## File: AEGP/Grabba/Grabba_Strings.cpp
````cpp
#include "Grabba.h"

typedef struct {
	unsigned long	index;
	char			str[256];
} TableString;

TableString		g_strs[StrID_NUMTYPES] = {
	StrID_NONE,							"",
	StrID_Name,							"Grabba",
	StrID_Description,					"Frame grabbing plug-in.Copyright 1994-2023 Adobe Inc.",
	StrID_IdleCount,					"Grabba : IdleHook called %d times.",
	StrID_SuiteError,					"Error acquiring suite."

};


char	*GetStringPtr(int strNum)
{
	return g_strs[strNum].str;
}
````

## File: AEGP/Grabba/Grabba_Strings.h
````c
#pragma once

typedef enum {
	StrID_NONE,
	StrID_Name,
	StrID_Description,
	StrID_IdleCount,
	StrID_SuiteError,
	StrID_NUMTYPES
} StrIDType;

char	*GetStringPtr(int strNum);
````

## File: AEGP/Grabba/Grabba.cpp
````cpp
#ifndef _WINSOCKAPI_
#include <boost/asio.hpp>
#endif
#include "Grabba.h"
#include <vector>
#include <string>
#include <opencv2/core.hpp>
#include <opencv2/imgproc.hpp>
#include <opencv2/imgcodecs.hpp>
#include <iostream>
#include "Win/CSXSUtils.h"




static AEGP_Command			getimg		=	6969L;
static AEGP_PluginID		S_my_id				=	0L;
static A_long				S_idle_count		=	0L;
static SPBasicSuite			*sP					=	NULL;


std::string GetPlugPlugPath() {
	AEGP_SuiteHandler	suites(sP);


		const A_char* myScript = R"(
			function get_path() {
				var startupFolder = Folder.startup;
				var startupFolderPath = startupFolder.fsName;
				var dll = "\\PlugPlug.dll";
				var path = startupFolderPath + dll;
				return path;
			}
			get_path();
		)";

		AEGP_MemHandle outResult = NULL;     // To hold the return value from the script
		AEGP_MemHandle outErrorString = NULL; // To hold any error message
		AEGP_MemSize resultSize = 0;

		//AEGP_isscriptingavailable, returns bool value. Use this to check, and do a timeout loop if it's not available yet.
		A_Boolean isScriptingAvailable = FALSE;

		while (!isScriptingAvailable) {
			suites.UtilitySuite6()->AEGP_IsScriptingAvailable(&isScriptingAvailable);
			Sleep(100);
		}

		// Execute the script
		A_Err err = suites.UtilitySuite6()->AEGP_ExecuteScript(
			S_my_id,
			myScript,
			false,
			&outResult,
			&outErrorString
		);

		if (!err && outResult) {
			A_char* resultStr = NULL;
			suites.MemorySuite1()->AEGP_GetMemHandleSize(outResult, &resultSize);
			suites.MemorySuite1()->AEGP_LockMemHandle(outResult, (void**)&resultStr);
			suites.MemorySuite1()->AEGP_UnlockMemHandle(outResult);
			return resultStr;

}
else {
			return "Error";
		}
}


extern "C" DllExport char* RegisterEvent(const char* EventType)
{
	std::string path;
	path = GetPlugPlugPath();

	LoadDLL(path);

	int result = RegisterEventListener(EventType);

	if (result == 1) {
		return "Success";
	}
	else {
		return "Error";
	}
}


static A_Err
DeathHook(
	AEGP_GlobalRefcon	plugin_refconP,
	AEGP_DeathRefcon	refconP)
{
	A_Err	err			= A_Err_NONE;
	AEGP_SuiteHandler	suites(sP);

	A_char report[AEGP_MAX_ABOUT_STRING_SIZE] = {'\0'};

	suites.ANSICallbacksSuite1()->sprintf(report, STR(StrID_IdleCount), S_idle_count);

	return err;
}

static	A_Err
IdleHook(
	AEGP_GlobalRefcon	plugin_refconP,
	AEGP_IdleRefcon		refconP,
	A_long				*max_sleepPL)
{
	A_Err	err			= A_Err_NONE;
	S_idle_count++;

	return err;
}

static A_Err
UpdateMenuHook(
	AEGP_GlobalRefcon		plugin_refconPV,
	AEGP_UpdateMenuRefcon	refconPV,
	AEGP_WindowType			active_window)
{
	A_Err 				err 			=	A_Err_NONE,
						err2			=	A_Err_NONE;

	AEGP_ItemH			active_itemH	=	NULL;

	AEGP_ItemType		item_type		=	AEGP_ItemType_NONE;

	AEGP_SuiteHandler	suites(sP);

	ERR(suites.ItemSuite6()->AEGP_GetActiveItem(&active_itemH));

	if (active_itemH){
		ERR(suites.ItemSuite6()->AEGP_GetItemType(active_itemH, &item_type));

		if (AEGP_ItemType_COMP 		==	item_type	||
			AEGP_ItemType_FOOTAGE	==	item_type)	{
			ERR(suites.CommandSuite1()->AEGP_EnableCommand(getimg));
		}
	} else {
		ERR2(suites.CommandSuite1()->AEGP_DisableCommand(getimg));
	}
	return err;
}

static A_Err
CommandHook(
	AEGP_GlobalRefcon	plugin_refconPV,
	AEGP_CommandRefcon	refconPV,
	AEGP_Command		command,
	AEGP_HookPriority	hook_priority,
	A_Boolean			already_handledB,
	A_Boolean* handledPB)
{
	A_Err			err = A_Err_NONE,
		err2 = A_Err_NONE;

	AEGP_SuiteHandler	suites(sP);
	std::string path;
	path = GetPlugPlugPath();

	LoadDLL(path);

	int result = RegisterEventListener("com.adobe.csxs.events.MyCustomEvent");

	if (getimg == command) {

		AEGP_ItemH			active_itemH = NULL;
		AEGP_RenderOptionsH	roH = NULL;

		ERR(suites.ItemSuite6()->AEGP_GetActiveItem(&active_itemH));

		if (active_itemH) {
			ERR(suites.RenderOptionsSuite1()->AEGP_NewFromItem(S_my_id, active_itemH, &roH));

			if (!err && roH) {
				AEGP_FrameReceiptH	receiptH = NULL;
				AEGP_WorldH			frameH = NULL;
				A_Time				timeT = { 0,1 };
				AEGP_WorldType		type = AEGP_WorldType_NONE;
				AEGP_MemHandle		resultH = NULL,
					errH = NULL;
				A_Boolean			const platform_encodingB = FALSE;
				AEGP_MemHandle		scriptH = NULL;

				ERR(suites.RenderOptionsSuite1()->AEGP_SetTime(roH, timeT));
				ERR(suites.RenderOptionsSuite1()->AEGP_GetWorldType(roH, &type));
				ERR(suites.RenderSuite2()->AEGP_RenderAndCheckoutFrame(roH, NULL, NULL, &receiptH));

				if (receiptH) {
					ERR(suites.RenderSuite2()->AEGP_GetReceiptWorld(receiptH, &frameH));

					if (frameH) {
						AEGP_WorldType worldType;
						ERR(suites.WorldSuite3()->AEGP_GetType(frameH, &worldType));

						if (worldType && worldType == AEGP_WorldType_8) {
							A_long width = 0, height = 0;
							ERR(suites.WorldSuite3()->AEGP_GetSize(frameH, &width, &height));

							if (width > 0 && height > 0) {
								A_u_long row_bytes = 0;
								ERR(suites.WorldSuite3()->AEGP_GetRowBytes(frameH, &row_bytes));

								PF_Pixel8* pixelData = nullptr;
								ERR(suites.WorldSuite3()->AEGP_GetBaseAddr8(frameH, &pixelData));

								if (pixelData) {
									unsigned char* imgdata = reinterpret_cast<unsigned char*>(pixelData);
									cv::Mat argb(height, width, CV_8UC4, imgdata);

									cv::Mat bgra(height, width, CV_8UC4);


									int fromTo[] = { 0, 3, 1, 2, 2, 1, 3, 0 };
									cv::mixChannels(&argb, 1, &bgra, 1, fromTo, 4);


									std::vector<uchar> buffer;

									cv::imencode(".png", bgra, buffer);

								}
							}
						}
					}
					ERR2(suites.RenderSuite2()->AEGP_CheckinFrame(receiptH));
				}
				*handledPB = TRUE;

			}
			ERR(suites.RenderOptionsSuite1()->AEGP_Dispose(roH));
		}

	}
	return err;
}

A_Err
EntryPointFunc(
	struct SPBasicSuite* pica_basicP,
	A_long				 	major_versionL,
	A_long					minor_versionL,
	AEGP_PluginID			aegp_plugin_id,
	AEGP_GlobalRefcon* global_refconV)
{
	S_my_id = aegp_plugin_id;
	A_Err 					err = A_Err_NONE,
		err2 = A_Err_NONE;

	sP = pica_basicP;

	AEGP_SuiteHandler suites(pica_basicP);

	ERR(suites.CommandSuite1()->AEGP_GetUniqueCommand(&getimg));

	ERR(suites.CommandSuite1()->AEGP_InsertMenuCommand(getimg,
		"getimg",
		AEGP_Menu_EXPORT,
		AEGP_MENU_INSERT_SORTED));

	ERR(suites.RegisterSuite5()->AEGP_RegisterCommandHook(S_my_id,
		AEGP_HP_BeforeAE,
		AEGP_Command_ALL,
		CommandHook,
		0));

	ERR(suites.RegisterSuite5()->AEGP_RegisterDeathHook(S_my_id, DeathHook, NULL));

	ERR(suites.RegisterSuite5()->AEGP_RegisterUpdateMenuHook(S_my_id, UpdateMenuHook, NULL));

	ERR(suites.RegisterSuite5()->AEGP_RegisterIdleHook(S_my_id, IdleHook, NULL));

	if (err) {
		ERR2(suites.UtilitySuite3()->AEGP_ReportInfo(S_my_id, "Grabba : Could not register command hook."));
	}
	return err;
}
````

## File: AEGP/Grabba/Grabba.h
````c
#pragma once

#include "AEConfig.h"
#ifdef AE_OS_WIN
	#include <windows.h>
#endif

#include "entry.h"
#include "AE_GeneralPlug.h"
#include "AE_Macros.h"
#include "AEGP_SuiteHandler.h"
#include "String_Utils.h"
#include "Grabba_Strings.h"

#define AEGP_MAX_STREAM_DIM 4


extern "C" DllExport AEGP_PluginInitFuncPrototype EntryPointFunc;
````

## File: HelloWorld/include/SoCClient.h
````c
#ifdef PUBLIC










#else






















#endif

#if SC_ONCE
#pragma once
#endif

#ifndef _SoCClient_h
#define _SoCClient_h

#ifndef PUBLIC
#include <stddef.h>
#include "SoSharedLibDefs.h"
#endif

#ifdef __cplusplus
extern "C" {
#endif

#ifndef PUBLIC




#endif









typedef long* SoHServer ;
typedef long* SoHObject ;











struct SoCClientName_s
{
	const char* name_sig ;
	int			id       ;
	char*       desc     ;
};
typedef struct SoCClientName_s SoCClientName   ;
typedef SoCClientName*         SoCClientName_p ;











typedef void* (*SoMemoryMalloc_f)(size_t) ;
typedef void  (*SoMemoryFree_f)  (void*)  ;
struct SoMemoryInterface_s
{
  SoMemoryMalloc_f malloc ;
  SoMemoryFree_f   free   ;
} ;
typedef struct SoMemoryInterface_s SoMemoryInterface   ;
typedef        SoMemoryInterface*  SoMemoryInterface_p ;















typedef ESerror_t (*SoObjectInitialize_f)( SoHObject hObject, int argc,TaggedData* argv) ;
typedef ESerror_t (*SoObjectGet_f       )( SoHObject hObject, SoCClientName* name,TaggedData*  pValue) ;
typedef ESerror_t (*SoObjectPut_f       )( SoHObject hObject, SoCClientName* name, TaggedData* pValue) ;
typedef ESerror_t (*SoObjectCall_f      )( SoHObject hObject, SoCClientName* name,int argc,TaggedData* argv,TaggedData* pResult) ;
typedef ESerror_t (*SoObjectValueOf_f   )( SoHObject hObject, TaggedData* pResult) ;
typedef ESerror_t (*SoObjectToString_f  )( SoHObject hObject, TaggedData* pResult) ;
typedef ESerror_t (*SoObjectFinalize_f  )( SoHObject hObject) ;

typedef struct SoObjectInterface_s
{
  SoObjectInitialize_f    initialize    ;
  SoObjectPut_f           put           ;
  SoObjectGet_f           get           ;
  SoObjectCall_f          call          ;
  SoObjectValueOf_f       valueOf       ;
  SoObjectToString_f      toString      ;
  SoObjectFinalize_f      finalize      ;
} SoObjectInterface, *SoObjectInterface_p ;





typedef struct SoServerInterface_s SoServerInterface   ;
typedef        SoServerInterface*  SoServerInterface_p ;

typedef void*     (*SoServerMalloc_f        )(SoHServer hServer,size_t nBytes ) ;
typedef void      (*SoServerFree_f          )(SoHObject hObject,void*  pMem   ) ;
typedef ESerror_t (*SoServerDumpServer_f    )(SoHServer hServer ) ;
typedef ESerror_t (*SoServerDumpObject_f    )(SoHObject hObject ) ;
typedef ESerror_t (*SoServerAddClass_f      )(SoHServer hServer,char* name,SoObjectInterface_p objectInterface) ;
typedef ESerror_t (*SoServerAddMethod_f     )(SoHObject hObject,const char* name,int id,char* desc) ;
typedef ESerror_t (*SoServerAddMethods_f    )(SoHObject hObject,SoCClientName_p pNames            ) ;
typedef ESerror_t (*SoServerAddProperty_f   )(SoHObject hObject,const char* name,int id,char* desc) ;
typedef ESerror_t (*SoServerAddProperties_f )(SoHObject hObject,SoCClientName_p pNames            ) ;
typedef ESerror_t (*SoServerGetClass_f      )(SoHObject hObject,char* name,int name_l             ) ;
typedef ESerror_t (*SoServerGetServer_f     )(SoHObject hObject,SoHServer* phServer   ,SoServerInterface_p* ppServerInterface) ;
typedef ESerror_t (*SoServerSetClientData_f )(SoHObject hObject,void*      pClientData) ;
typedef ESerror_t (*SoServerGetClientData_f )(SoHObject hObject,void**    ppClientData) ;
typedef ESerror_t (*SoServerEval_f          )(SoHObject hServer,char* string,TaggedData* pTaggedData) ;
typedef ESerror_t (*SoServerTaggedDataInit_f)(SoHObject hServer,TaggedData* pTaggedData) ;
typedef ESerror_t (*SoServerTaggedDataFree_f)(SoHServer hServer,TaggedData* pTaggedData) ;
#ifndef PUBLIC
typedef ESerror_t (*SoServerCallLiveObject_f)(SoHServer hServer,SoHObject hObject,char* method,int argc,TaggedData* argv,TaggedData* pResult) ;
typedef ESerror_t (*SoServerGetLiveObject_f )(SoHServer hServer,SoHObject hObject,char* method,TaggedData* pResult) ;
typedef ESerror_t (*SoServerPutLiveObject_f )(SoHServer hServer,SoHObject hObject,char* method,TaggedData* pValue ) ;
#else
typedef ESerror_t (*SoReserved_f)(void) ;
#endif


















#ifndef PUBLIC





#endif

struct SoServerInterface_s
{
  SoServerDumpServer_f      dumpServer    ;
  SoServerDumpObject_f      dumpObject    ;
  SoServerAddClass_f        addClass      ;

  SoServerAddMethod_f       addMethod     ;
  SoServerAddMethods_f      addMethods    ;
  SoServerAddProperty_f     addProperty   ;
  SoServerAddProperties_f   addProperties ;

  SoServerGetClass_f        getClass       ;
  SoServerGetServer_f       getServer      ;

  SoServerSetClientData_f   setClientData  ;
  SoServerGetClientData_f   getClientData  ;

  SoServerEval_f            eval           ;
  SoServerTaggedDataInit_f  taggedDataInit ;
  SoServerTaggedDataFree_f	taggedDataFree ;

#ifndef PUBLIC
  SoServerCallLiveObject_f  callLiveObject ;
  SoServerGetLiveObject_f   getLiveObject  ;
  SoServerPutLiveObject_f   putLiveObject  ;
#else
  SoReserved_f   			reserved1  ;
  SoReserved_f   			reserved2  ;
  SoReserved_f   			reserved3  ;
#endif
} ;




typedef enum
{ kSoCClient_init
, kSoCClient_term
} SoCClient_e ;








typedef ESerror_t (*SoCClient_f)
( SoCClient_e        eReason
, SoServerInterface* pServer
, SoHServer          hServer
) ;









extern ESerror_t SoCClientInitialize(SoCClient_f,SoMemoryInterface_p) ;





extern ESerror_t SoCClientTerminate (SoCClient_f) ;





extern ESerror_t SoCClientTerminateAll() ;




#ifdef __cplusplus
}
#endif
#endif
````

## File: HelloWorld/include/SoSharedLibDefs.h
````c
#ifndef _SoSharedLibDefs_h
#define _SoSharedLibDefs_h













#define kESErrOK				0

#define kESErrNoLvalue			3

#define kESErrOpenString		4

#define kESErrBadDigit			6

#define kESErrSyntax			8

#define kESErrBadArgumentList	20

#define kESErrNoMemory			-28

#define kESErrException			-29

#define kESErrBadURI			31

#define kESErrBadAction			32

#define kESErrInternal			-33

#define kESErrNotImplemented	-36

#define kESErrRange				41

#define kESErrEval				43

#define kESErrConversion		44

#define kESErrInvalidObject		45

#define kESErrTypeMismatch		47

#define kESErrNoFile			48

#define kESErrFileExists		49

#define kESErrNotOpen			50

#define kESErrEOF				51

#define kESErrIO				52

#define kESErrNoPermission		53

#define kESErrCannotResolve		57

#define kESErrIOTimeout			58

#define kESErrNoResponse		59









struct TaggedData_s
{
	union
	{
		long	intval;
		double	fltval;
		char* 	string;
		long*   hObject;
	}			data;
	long		type;
	long		filler;
} ;

typedef struct TaggedData_s TaggedData ;








#define kTypeUndefined	0



#define kTypeBool		2


#define kTypeDouble		3






#define kTypeString		4



#define kTypeLiveObject 6



#define kTypeLiveObjectRelease 7


#define kTypeInteger	123


#define kTypeUInteger	124






#define kTypeScript		125

#ifdef __cplusplus
extern "C" {
#endif








	typedef long (*ESFunction) (TaggedData* argv, long argc, TaggedData* retval);

























typedef	  signed long    ESerror_t;

#ifdef __cplusplus
}
#endif



#endif
````

## File: HelloWorld/jsx/HellowWorld.jsx
````javascript
var helloWorldDll = null;

function initExtension() {
    try {
        helloWorldDll = new ExternalObject("lib:" + "C:\Users\\tjerf\\source\\repos\\HelloWorld\\x64\\Debug\\dll\\HelloWorld.dll");
    } catch (e) {
        alert("exception: " + e);
    }
}

initExtension();
function showAlertMessage(index) {

    var message = helloWorldDll.extGetAlertMessage(index);
    alert(message);
}
function showAlertMessageDefault() {

    var message = helloWorldDll.extGetAlertMessageDefault();
    alert(message);
}

showAlertMessage(1);
````

## File: HelloWorld/x64/Debug/HelloWorld.tlog/CL.command.1.tlog
````
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\HELLOWORLD.CPP
/c /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\DRAWBOTSUITE /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\CONFIG /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\UTIL /I"C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\INCLUDE" /Zi /nologo /W3 /WX- /diagnostics:column /Od /D WIN32 /D _DEBUG /D _WINDOWS /D _USRDLL /D BASICEXTERNALOBJECT_EXPORTS /D _WINDLL /D _UNICODE /D UNICODE /Gm- /EHsc /RTC1 /MDd /GS /fp:precise /Zc:wchar_t /Zc:forScope /Zc:inline /Fo"X64\DEBUG\\" /Fd"X64\DEBUG\VC143.PDB" /external:W3 /Gd /TP /FC C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\HELLOWORLD.CPP
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\AEGP_SUITEHANDLER.CPP
/c /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\DRAWBOTSUITE /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\CONFIG /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\UTIL /I"C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\INCLUDE" /Zi /nologo /W3 /WX- /diagnostics:column /Od /D WIN32 /D _DEBUG /D _WINDOWS /D _USRDLL /D BASICEXTERNALOBJECT_EXPORTS /D _WINDLL /D _UNICODE /D UNICODE /Gm- /EHsc /RTC1 /MDd /GS /fp:precise /Zc:wchar_t /Zc:forScope /Zc:inline /Fo"X64\DEBUG\\" /Fd"X64\DEBUG\VC143.PDB" /external:W3 /Gd /TP /FC C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\AEGP_SUITEHANDLER.CPP
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\MISSINGSUITEERROR.CPP
/c /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\DRAWBOTSUITE /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\CONFIG /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS /IC:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\UTIL /I"C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\INCLUDE" /Zi /nologo /W3 /WX- /diagnostics:column /Od /D WIN32 /D _DEBUG /D _WINDOWS /D _USRDLL /D BASICEXTERNALOBJECT_EXPORTS /D _WINDLL /D _UNICODE /D UNICODE /Gm- /EHsc /RTC1 /MDd /GS /fp:precise /Zc:wchar_t /Zc:forScope /Zc:inline /Fo"X64\DEBUG\\" /Fd"X64\DEBUG\VC143.PDB" /external:W3 /Gd /TP /FC C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\MISSINGSUITEERROR.CPP
````

## File: HelloWorld/x64/Debug/HelloWorld.tlog/Cl.items.tlog
````
C:\Users\tjerf\source\repos\HelloWorld\HelloWorld.cpp;C:\Users\tjerf\source\repos\HelloWorld\x64\Debug\HelloWorld.obj
C:\Users\tjerf\source\repos\HelloWorld\AEGP_SuiteHandler.cpp;C:\Users\tjerf\source\repos\HelloWorld\x64\Debug\AEGP_SuiteHandler.obj
C:\Users\tjerf\source\repos\HelloWorld\MissingSuiteError.cpp;C:\Users\tjerf\source\repos\HelloWorld\x64\Debug\MissingSuiteError.obj
````

## File: HelloWorld/x64/Debug/HelloWorld.tlog/CL.read.1.tlog
````
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\HELLOWORLD.CPP
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\INCLUDE\SOSHAREDLIBDEFS.H
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\HELLOWWORLD.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\STDLIB.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\SAL.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CONCURRENCYSAL.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VADEFS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_MALLOC.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_SEARCH.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\STDDEF.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WSTDLIB.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\LIMITS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\STDIO.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WSTDIO.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_STDIO_CONFIG.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINDOWS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WINAPIFAMILY.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WINPACKAGEFAMILY.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\SDKDDKVER.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\EXCPT.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\STDARG.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WINDEF.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\MINWINDEF.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\SPECSTRINGS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\SPECSTRINGS_STRICT.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\SPECSTRINGS_UNDEF.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\DRIVERSPECS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\SDV_DRIVERSPECS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINNT.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CTYPE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WCTYPE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\KERNELSPECS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\BASETSD.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\GUIDDEF.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\STRING.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_MEMORY.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_MEMCPY_S.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\ERRNO.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_STRING.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WSTRING.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\PSHPACK4.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\POPPACK.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\PSHPACK2.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\PSHPACK8.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\PSHPACK1.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\APISET.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\KTMTYPES.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINBASE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\APISETCCONV.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\MINWINBASE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\APIQUERY2.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\PROCESSENV.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\FILEAPIFROMAPP.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\FILEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\DEBUGAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\UTILAPISET.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\HANDLEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\ERRHANDLINGAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\FIBERSAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\NAMEDPIPEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\PROFILEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\HEAPAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\IOAPISET.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\SYNCHAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\INTERLOCKEDAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\PROCESSTHREADSAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\SYSINFOAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\MEMORYAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\ENCLAVEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\THREADPOOLLEGACYAPISET.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\THREADPOOLAPISET.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\JOBAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\JOBAPI2.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WOW64APISET.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\LIBLOADERAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\SECURITYBASEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\NAMESPACEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\SYSTEMTOPOLOGYAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\PROCESSTOPOLOGYAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\SECURITYAPPCONTAINER.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\REALTIMEAPISET.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WINERROR.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\TIMEZONEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINGDI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINUSER.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\TVOUT.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINNLS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\DATETIMEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\STRINGAPISET.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINCON.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINCONTYPES.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\CONSOLEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\CONSOLEAPI2.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\CONSOLEAPI3.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINVER.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\VERRSRC.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINREG.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\REASON.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINNETWK.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WNNC.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\CDERR.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\DDE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\DDEML.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\DLGS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\LZEXPAND.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\MMSYSTEM.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\MMSYSCOM.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\MCIAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\MMISCAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\MMISCAPI2.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\PLAYSOUNDAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\MMEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\TIMEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\JOYSTICKAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\NB30.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\RPC.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\RPCDCE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\RPCDCEP.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\RPCNSI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\RPCNTERR.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\RPCASYNC.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\SHELLAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINPERF.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINSOCK.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\INADDR.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINCRYPT.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\BCRYPT.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\NCRYPT.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\DPAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINEFS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINSCARD.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WTYPES.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\RPCNDR.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\RPCNSIP.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\RPCSAL.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WTYPESBASE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINIOCTL.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WINSMCRD.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINSPOOL.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\PRSHT.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\OLE2.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\OBJBASE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\COMBASEAPI.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\UNKNWNBASE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\OBJIDLBASE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\CGUID.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\COML2API.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\OBJIDL.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\UNKNWN.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\PROPIDLBASE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\OAIDL.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\URLMON.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\OLEIDL.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\SERVPROV.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\MSXML.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\PROPIDL.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\OLEAUTO.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\COMMDLG.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\STRALIGN.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\WINSVC.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\MCX.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\IMM.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UM\IME_CMODES.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\FSTREAM
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\YVALS_CORE.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XKEYCHECK.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\ISTREAM
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\OSTREAM
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\IOS
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XLOCNUM
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CLIMITS
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CMATH
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\YVALS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CRTDBG.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_NEW_DEBUG.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_NEW.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CRTDEFS.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\USE_ANSI.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CSTDLIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\MATH.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_MATH.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XTR1COMMON
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\INTRIN0.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\INTRIN0.INL.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CSTDIO
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\ITERATOR
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\IOSFWD
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CSTRING
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CWCHAR
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\WCHAR.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WCONIO.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WDIRECT.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WIO.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_SHARE.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WPROCESS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WTIME.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\SYS\STAT.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\SYS\TYPES.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XSTDDEF
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CSTDDEF
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\INITIALIZER_LIST
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XUTILITY
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\__MSVC_ITER_CORE.HPP
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\UTILITY
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\TYPE_TRAITS
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CSTDINT
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\STDINT.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\STREAMBUF
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XIOSBASE
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\SHARE.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\SYSTEM_ERROR
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\__MSVC_SYSTEM_ERROR_ABI.HPP
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CERRNO
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\STDEXCEPT
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\EXCEPTION
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\MALLOC.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_EXCEPTION.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\EH.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_TERMINATE.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XSTRING
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XMEMORY
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\LIMITS
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CFLOAT
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\FLOAT.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\ISA_AVAILABILITY.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\NEW
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XATOMIC.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\__MSVC_SANITIZER_ANNOTATE_CONTAINER.HPP
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XCALL_ONCE.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XERRC.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\ATOMIC
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XTHREADS.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XTIMEC.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CTIME
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\TIME.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XLOCALE
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\MEMORY
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\TYPEINFO
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_TYPEINFO.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XFACET
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XLOCINFO
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\__MSVC_XLOCINFO_TYPES.HPP
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CCTYPE
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CLOCALE
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\LOCALE.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\IOSTREAM
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\AEGP_SUITEHANDLER.CPP
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\UTIL\AEGP_SUITEHANDLER.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_GENERALPLUG.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\A.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\STDINT.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\SAL.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CONCURRENCYSAL.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VADEFS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\CONFIG\PRECONFIG.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\CONFIG\POSTCONFIG.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\FIEL_PUBLIC.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECT.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTCB.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPBASIC.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPTYPES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPCONFIG.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\PSINTTYPES.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CSTDINT
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\YVALS_CORE.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XKEYCHECK.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPERRORCODES.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\STDDEF.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\PR_PUBLIC.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTSUITES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTUI.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\DRAWBOTSUITE\DRAWBOTSUITETYPES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTSUITESOLD.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\PF_MASKS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_IO.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_IO_FILEEXT.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\PT_PUBLIC.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_GENERALPLUGPRE.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_GENERALPLUGPOST.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_GENERALPLUGOLD.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_ADVEFFECTSUITES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTCBSUITES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTPIXELFORMAT.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTSUITESHELPER.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\DRAWBOTSUITE.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\EXCEPTION
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\YVALS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CRTDBG.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_NEW_DEBUG.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_NEW.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CRTDEFS.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\USE_ANSI.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\TYPE_TRAITS
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XSTDDEF
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CSTDDEF
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XTR1COMMON
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CSTDLIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\MATH.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_MATH.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\STDLIB.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_MALLOC.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_SEARCH.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WSTDLIB.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\LIMITS.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\INITIALIZER_LIST
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\MALLOC.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_EXCEPTION.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\EH.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_TERMINATE.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\CONFIG\ADOBESDKTYPES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPSUITES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPACCESS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPPLUGS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPFILES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPPROPS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPMDATA.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPPIPL.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\PHOTOSHOP\CONFIG\PLATFORM.HPP
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\ARTEMIS\CONFIG\PLATFORM.HPP
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\SDKDDKVER.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WINAPIFAMILY.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WINPACKAGEFAMILY.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPADAPTS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPCACHES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPSTRNGS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_MACROS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\STRING.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_MEMORY.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_MEMCPY_S.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\ERRNO.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_STRING.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WSTRING.H
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\MISSINGSUITEERROR.CPP
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\UTIL\AEGP_SUITEHANDLER.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_GENERALPLUG.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\A.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\STDINT.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\SAL.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CONCURRENCYSAL.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VADEFS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\CONFIG\PRECONFIG.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\CONFIG\POSTCONFIG.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\FIEL_PUBLIC.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECT.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTCB.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPBASIC.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPTYPES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPCONFIG.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\PSINTTYPES.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CSTDINT
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\YVALS_CORE.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XKEYCHECK.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPERRORCODES.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\STDDEF.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\PR_PUBLIC.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTSUITES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTUI.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\DRAWBOTSUITE\DRAWBOTSUITETYPES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTSUITESOLD.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\PF_MASKS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_IO.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_IO_FILEEXT.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\PT_PUBLIC.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_GENERALPLUGPRE.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_GENERALPLUGPOST.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_GENERALPLUGOLD.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_ADVEFFECTSUITES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTCBSUITES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTPIXELFORMAT.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\AE_EFFECTSUITESHELPER.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\DRAWBOTSUITE.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\EXCEPTION
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\YVALS.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CRTDBG.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_NEW_DEBUG.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_NEW.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CRTDEFS.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\USE_ANSI.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\TYPE_TRAITS
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XSTDDEF
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CSTDDEF
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\XTR1COMMON
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\CSTDLIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\MATH.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_MATH.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\STDLIB.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_MALLOC.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_SEARCH.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_WSTDLIB.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\LIMITS.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\INITIALIZER_LIST
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\MALLOC.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\VCRUNTIME_EXCEPTION.H
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\INCLUDE\EH.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\UCRT\CORECRT_TERMINATE.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\ADOBESDK\CONFIG\ADOBESDKTYPES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPSUITES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPACCESS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPPLUGS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPFILES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPPROPS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPMDATA.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPPIPL.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\PHOTOSHOP\CONFIG\PLATFORM.HPP
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\ARTEMIS\CONFIG\PLATFORM.HPP
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\SDKDDKVER.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WINAPIFAMILY.H
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\INCLUDE\10.0.22000.0\SHARED\WINPACKAGEFAMILY.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPADAPTS.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPCACHES.H
C:\USERS\TJERF\DESKTOP\AFTEREFFECTSSDK\EXAMPLES\HEADERS\SP\SPSTRNGS.H
````

## File: HelloWorld/x64/Debug/HelloWorld.tlog/CL.write.1.tlog
````
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\AEGP_SUITEHANDLER.CPP|C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\HELLOWORLD.CPP|C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\MISSINGSUITEERROR.CPP
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\VC143.PDB
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\MISSINGSUITEERROR.OBJ
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\AEGP_SUITEHANDLER.OBJ
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\HELLOWORLD.OBJ
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\HELLOWORLD.CPP
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\VC143.PDB
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\AEGP_SUITEHANDLER.CPP
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\VC143.PDB
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\MISSINGSUITEERROR.CPP
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\VC143.PDB
````

## File: HelloWorld/x64/Debug/HelloWorld.tlog/HelloWorld.lastbuildstate
````
PlatformToolSet=v143:VCToolArchitecture=Native64Bit:VCToolsVersion=14.36.32532:TargetPlatformVersion=10.0.22000.0:VcpkgTriplet=x64-windows:
Debug|x64|C:\Users\tjerf\source\repos\HelloWorld\|
````

## File: HelloWorld/x64/Debug/HelloWorld.tlog/link.command.1.tlog
````
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\AEGP_SUITEHANDLER.OBJ|C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\HELLOWORLD.OBJ|C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\MISSINGSUITEERROR.OBJ
/OUT:"C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\DLL\HELLOWORLD.DLL" /INCREMENTAL /ILK:"X64\DEBUG\HELLOWORLD.ILK" /NOLOGO /LIBPATH:"C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB" /LIBPATH:"C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\MANUAL-LINK" KERNEL32.LIB USER32.LIB GDI32.LIB WINSPOOL.LIB COMDLG32.LIB ADVAPI32.LIB SHELL32.LIB OLE32.LIB OLEAUT32.LIB UUID.LIB ODBC32.LIB ODBCCP32.LIB "C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\*.LIB" /MANIFEST /MANIFESTUAC:"level='asInvoker' uiAccess='false'" /manifest:embed /DEBUG /PDB:"C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\DLL\HELLOWORLD.PDB" /SUBSYSTEM:WINDOWS /TLBID:1 /DYNAMICBASE /NXCOMPAT /IMPLIB:"C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\DLL\HELLOWORLD.LIB" /MACHINE:X64 /DLL X64\DEBUG\HELLOWORLD.OBJ
X64\DEBUG\AEGP_SUITEHANDLER.OBJ
X64\DEBUG\MISSINGSUITEERROR.OBJ
````

## File: HelloWorld/x64/Debug/HelloWorld.tlog/link.read.1.tlog
````
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\AEGP_SUITEHANDLER.OBJ|C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\HELLOWORLD.OBJ|C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\MISSINGSUITEERROR.OBJ
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\KERNEL32.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\USER32.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\GDI32.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\WINSPOOL.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\COMDLG32.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\ADVAPI32.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\SHELL32.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\OLE32.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\OLEAUT32.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\UUID.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\ODBC32.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UM\X64\ODBCCP32.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\BZ2.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\CPR.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\LIBCRYPTO.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\LIBCURL.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\LIBEXPAT.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\LIBFFI.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\LIBPROTOBUF-LITE.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\LIBPROTOBUF.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\LIBPROTOC.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\LIBSSL.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\LZMA.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\PYTHON3.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\PYTHON310.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\SQLITE3.LIB
C:\USERS\TJERF\VCPKG\INSTALLED\X64-WINDOWS\LIB\ZLIB.LIB
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\HELLOWORLD.OBJ
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\AEGP_SUITEHANDLER.OBJ
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\MISSINGSUITEERROR.OBJ
C:\WINDOWS\GLOBALIZATION\SORTING\SORTDEFAULT.NLS
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\LIB\X64\MSVCPRTD.LIB
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\LIB\X64\MSVCRTD.LIB
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\LIB\X64\OLDNAMES.LIB
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\LIB\X64\VCRUNTIMED.LIB
C:\PROGRAM FILES (X86)\WINDOWS KITS\10\LIB\10.0.22000.0\UCRT\X64\UCRTD.LIB
C:\WINDOWS\SYSTEM32\TZRES.DLL
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\BIN\HOSTX64\X64\1033\LINKUI.DLL
C:\PROGRAM FILES\MICROSOFT VISUAL STUDIO\2022\COMMUNITY\VC\TOOLS\MSVC\14.36.32532\BIN\HOSTX64\X64\CVTRES.EXE
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\VC143.PDB
````

## File: HelloWorld/x64/Debug/HelloWorld.tlog/link.write.1.tlog
````
^C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\AEGP_SUITEHANDLER.OBJ|C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\HELLOWORLD.OBJ|C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\MISSINGSUITEERROR.OBJ
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\HELLOWORLD.ILK
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\DLL\HELLOWORLD.DLL
C:\USERS\TJERF\SOURCE\REPOS\HELLOWORLD\X64\DEBUG\DLL\HELLOWORLD.PDB
````

## File: HelloWorld/x64/Debug/HelloWorld.tlog/link.write.2u.tlog
````
^C:\Users\tjerf\source\repos\HelloWorld\HelloWorld.vcxproj
C:\Users\tjerf\source\repos\HelloWorld\x64\Debug\dll\HelloWorld.lib
C:\Users\tjerf\source\repos\HelloWorld\x64\Debug\dll\HelloWorld.exp
````

## File: HelloWorld/x64/Debug/HelloWorld.dll.recipe
````
<?xml version="1.0" encoding="utf-8"?>
<Project>
  <ProjectOutputs>
    <ProjectOutput>
      <FullPath>C:\Users\tjerf\source\repos\HelloWorld\x64\Debug\dll\HelloWorld.dll</FullPath>
    </ProjectOutput>
  </ProjectOutputs>
  <ContentFiles />
  <SatelliteDlls />
  <NonRecipeFileRefs />
</Project>
````

## File: HelloWorld/x64/Debug/HelloWorld.vcxproj.FileListAbsolute.txt
````

````

## File: HelloWorld/HelloWorld.cpp
````cpp
#include "./include/SoSharedLibDefs.h"
#include "HellowWorld.h"
#include <stdlib.h>
#include <stdio.h>
#include <windows.h>
#include <fstream>
#include <iostream>
#include "include/SoCClient.h"
#include "samplelib.h"


#pragma warning( push )
#pragma warning(disable : 4996)


#define strdup _strdup


namespace {

    char EXTENSION_FUNCTIONS[] = {
        "extGetAlertMessageDefault,"
        "extGetAlertMessage_u,"
    };


    constexpr long HELLO_WORLD_VERSION = 1;
}

#if MAC
#define unused(a) (void*) a ;
#else
void* unused(void* x) { return x; };
#endif


extern "C" {

    EXPORT long ESGetVersion() {
        return HELLO_WORLD_VERSION;
    }


    EXPORT char* ESInitialize(TaggedData*, long) {
        return EXTENSION_FUNCTIONS;
    }


    EXPORT void ESTerminate() {
    }


    EXPORT void* ESMallocMem(size_t size) {
        void* p = malloc(size);
        return p;
    }


    EXPORT void ESFreeMem(void* p) {
        if (p != nullptr) {
            free(p);
        }
    }

}


extern "C" {

    EXPORT long returnString(TaggedData* argv, long argc, TaggedData* retval) {

        if (argc != 0) {
            return kESErrBadArgumentList;
        }


        const char* message = "Hello, Adobe!";
        const size_t length = strlen(message) + 1;


        char* buff = (char*)ESMallocMem(length);


        if (buff == nullptr) {
            return kESErrNoMemory;
        }


        strcpy(buff, message);


        retval->type = kTypeString;
        retval->data.string = buff;


        return kESErrOK;
    }


    EXPORT long extGetAlertMessageDefault(TaggedData* inputData, long inputDataCount, TaggedData* outputData) {
        if (outputData == nullptr) {
            return kESErrNoLvalue;
        }

        const char* message = "hello from ExtendScript.";


        const auto length = strlen(message) + 1;
        char* str = (char*)malloc(length);
        if (str == nullptr) {
            return kESErrNoMemory;
        }

        strcpy_s(str, length, message);

        outputData->data.string = str;
        outputData->type = kTypeString;

        return kESErrOK;
    }


    EXPORT long extGetAlertMessage(TaggedData* inputData, long inputDataCount, TaggedData* outputData) {
        const char* messages[] = {
            "Hello CEP.",
            "Hello World.",
            "Hello Native Extension.",
        };


        if (inputDataCount < 1) {
            return kESErrSyntax;
        }

        HMODULE hModule = GetModuleHandle(TEXT("C:\\Program Files\\Adobe\\Adobe After Effects 2023\\Support Files\\Plug-ins\\Effects\\Grabba.aex"));
        if (!hModule) {
            std::cerr << "Failed to load DLL." << std::endl;
            return NULL;
        }


        typedef void(*RegisterEvent)(const char*);
        RegisterEvent registerEvent = (RegisterEvent)GetProcAddress(hModule, "RegisterEvent");
        if (!registerEvent) {
            std::cerr << "Failed to get function pointer." << std::endl;
            return NULL;
        }


        registerEvent("com.adobe.csxs.events.MyCustomEvent");

        char* str = nullptr;
        {
            const char* message = messages[inputData[0].data.intval];
            const auto length = strlen(message) + 1;
            str = (char*)malloc(length);
            strcpy_s(str, length, message);

        }
        outputData->data.string = str;
        outputData->type = kTypeString;

        return kESErrOK;
    }
}













extern "C" SAMPLIB long built(TaggedData * argv, long argc, TaggedData * result)
{
	int errval = kESErrOK;
	char sResult[1000];

	if (strlen(__DATE__) + strlen(__TIME__) < (sizeof(sResult) - 10)) {

		sResult[0] = 0;
		strcpy(sResult, __DATE__);
		strcat(sResult, " ");
		strcat(sResult, __TIME__);

		result->type = kTypeString;
		result->data.string = strdup(sResult);
		if (!result->data.string) errval = kESErrNoMemory;
	}
	else {
		errval = kESErrNoMemory;
	}

	unused(&argv);
	unused(&argc);

	return errval;
}









SoObjectInterface* gpObjectInterface = NULL;




SoServerInterface* gpServer = NULL;




SoHServer			ghServer = NULL;




int					ME = 0;

struct myData_s
{
	TaggedData	a;
	TaggedData	b;
	int			me;
};

typedef struct myData_s  myData_t;
typedef        myData_t* myData_p;


ESerror_t objectInitialize(SoHObject hObject, int argc, TaggedData* argv);
ESerror_t objectGet(SoHObject hObject, SoCClientName* name, TaggedData* pResult);
ESerror_t objectPut(SoHObject hObject, SoCClientName* name, TaggedData* pValue);
ESerror_t objectCall(SoHObject hObject, SoCClientName* name, int argc, TaggedData* argv, TaggedData* pResult);
ESerror_t objectToString(SoHObject hObject, TaggedData* pResult);
ESerror_t objectValueOf(SoHObject hObject, TaggedData* pResult);
ESerror_t objectFinalize(SoHObject hObject);












ESerror_t objectInitialize(SoHObject hObject, int argc, TaggedData* argv)
{



	SoCClientName Methods[] =
	{ {	"reverse"	, 0 , NULL	}
	,	{	"sine"		, 0 , NULL	}
	,   { NULL }
	};



	SoCClientName Properties[] =
	{ {	"a"			, 0 , NULL	}
	,	{	"b"			, 0 , NULL	}
	,	{	"pi"		, 0 , NULL	}
	,	{	"me"		, 0 , NULL	}
	,	{	"built"		, 0 , NULL	}
	,   {   NULL }
	};

	size_t   size = sizeof(myData_t);
	myData_p pMyData = NULL;

	unused(&argc);
	unused(argv);

	pMyData = (myData_p)(malloc(size));

	memset(pMyData, 0, size);
	pMyData->me = ++ME;
	gpServer->taggedDataInit(hObject, &pMyData->a);
	gpServer->taggedDataInit(hObject, &pMyData->b);
	gpServer->setClientData(hObject, pMyData);

	gpServer->addProperties(hObject, Properties);
	gpServer->addMethods(hObject, Methods);

	return kESErrOK;
}








ESerror_t objectGet(SoHObject hObject, SoCClientName* name, TaggedData* pResult)
{
	ESerror_t error = kESErrOK;

	myData_p pMyData = NULL;
	gpServer->getClientData(hObject, (void**)&pMyData);


	if (strcmp(name->name_sig, "a") == 0)
	{
		*pResult = pMyData->a;
		if (pResult->type == kTypeString) pResult->data.string = strdup(pResult->data.string);
	}

	else if (strcmp(name->name_sig, "b") == 0)
	{
		*pResult = pMyData->b;
		if (pResult->type == kTypeString) pResult->data.string = strdup(pResult->data.string);
	}

	else if (strcmp(name->name_sig, "pi") == 0)
	{
		pResult->type = kTypeDouble;
		pResult->data.fltval = atan2(1.0, 1.0) * 4.0;
	}

	else if (strcmp(name->name_sig, "built") == 0)
	{
		error = built(NULL, 0, pResult);
	}

	else if (strcmp(name->name_sig, "me") == 0)
	{
		pResult->type = kTypeInteger;
		pResult->data.intval = pMyData->me;
	}

	return error;
}








ESerror_t objectPut(SoHObject hObject, SoCClientName* name, TaggedData* pValue)
{
	myData_p    pMyData = NULL;

	gpServer->getClientData(hObject, (void**)&pMyData);

	if (strcmp(name->name_sig, "a") == 0)
	{
		pMyData->a = *pValue;
		if (pMyData->a.type == kTypeString) pMyData->a.data.string = strdup(pMyData->a.data.string);
	}
	else if (strcmp(name->name_sig, "b") == 0)
	{
		pMyData->b = *pValue;
		if (pMyData->b.type == kTypeString) pMyData->b.data.string = strdup(pMyData->b.data.string);
	}


	return 0;
}










ESerror_t objectCall(SoHObject hObject, SoCClientName* name, int argc, TaggedData* argv, TaggedData* pResult)
{
	ESerror_t result = kESErrOK;
	int       bReverse = strcmp(name->name_sig, "reverse") == 0;
	int       bSine = strcmp(name->name_sig, "sine") == 0;

	int       type = argc == 1 ? argv[0].type : kTypeUndefined;

	unused(hObject);

	if (bSine) {

		if (argc != 1)
			result = kESErrBadArgumentList;
		else if (type != kTypeDouble && type != kTypeInteger)
			result = kESErrTypeMismatch;
		else
		{
			double      angle = type == kTypeDouble ? argv[0].data.fltval : (double)argv[0].data.intval;
			double      pi = 4.0 * atan2(1.0, 1.0);
			double      radian = 180.0 / pi;
			angle = angle / radian;
			pResult->data.fltval = sin(angle);
			pResult->type = kTypeDouble;
		}
	}

	else if (bReverse) {

		if (argc != 1)
			result = kESErrBadArgumentList;
		else if (type != kTypeString)
			result = kESErrTypeMismatch;
		else
		{
			size_t i;
			size_t l;
			pResult->type = kTypeString;
			pResult->data.string = strdup(argv[0].data.string);
			l = strlen(pResult->data.string);
			for (i = 0; i < l / 2; i++) {
				char t = pResult->data.string[i];
				pResult->data.string[i] = pResult->data.string[l - i - 1];
				pResult->data.string[l - i - 1] = t;
			}
		}
	}

	return result;
}







ESerror_t objectValueOf(SoHObject hObject, TaggedData* pResult)
{
	myData_p    pMyData = NULL;
	gpServer->getClientData(hObject, (void**)&pMyData);

	pResult->type = kTypeString;
	pResult->data.string = strdup("objectValueOf:: this is the value");
	return   kESErrOK;

}







ESerror_t objectToString(SoHObject hObject, TaggedData* pResult)
{
	myData_p    pMyData = NULL;
	gpServer->getClientData(hObject, (void**)&pMyData);

	pResult->type = kTypeString;
	pResult->data.string = strdup("objectToString::Object");
	return   kESErrOK;
}






ESerror_t objectFinalize(SoHObject hObject)
{
	myData_p pMyData = NULL;
	gpServer->getClientData(hObject, (void**)&pMyData);
	if (pMyData) {
		if (pMyData->a.type == kTypeString) free((void*)pMyData->a.data.string);
		if (pMyData->b.type == kTypeString) free((void*)pMyData->b.data.string);
		free(pMyData);
		gpServer->setClientData(hObject, NULL);
	}
	return kESErrOK;
}






SoObjectInterface objectInterface =
{ objectInitialize
,  objectPut
,  objectGet
,  objectCall
,  NULL
,  NULL
,  objectFinalize
};


extern "C" SAMPLIB int  ESClientInterface(SoCClient_e kReason, SoServerInterface * pServer, SoHServer hServer)
{
	if (!gpObjectInterface) {
		gpObjectInterface = &objectInterface;
	}
	ghServer = hServer;

	switch (kReason)
	{
	case kSoCClient_init: {
		gpServer = pServer;
		ghServer = hServer;

		gpServer->addClass(hServer, "SampleLibObject", &objectInterface);
		return 0;
	} break;

	case kSoCClient_term: {
		ME = 0;
		return 0;
	} break;
	}

	return 0;
}

#if defined (_WINDOWS)
#pragma warning( pop )
#endif
````

## File: HelloWorld/HelloWorld.sln
````
Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 17
VisualStudioVersion = 17.6.33829.357
MinimumVisualStudioVersion = 10.0.40219.1
Project("{8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942}") = "HelloWorld", "HelloWorld.vcxproj", "{491DC6E6-840C-4693-B523-B499A0320C3A}"
EndProject
Global
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|Win32 = Debug|Win32
		Debug|x64 = Debug|x64
		Release|Win32 = Release|Win32
		Release|x64 = Release|x64
	EndGlobalSection
	GlobalSection(ProjectConfigurationPlatforms) = postSolution
		{491DC6E6-840C-4693-B523-B499A0320C3A}.Debug|Win32.ActiveCfg = Debug|Win32
		{491DC6E6-840C-4693-B523-B499A0320C3A}.Debug|Win32.Build.0 = Debug|Win32
		{491DC6E6-840C-4693-B523-B499A0320C3A}.Debug|x64.ActiveCfg = Debug|x64
		{491DC6E6-840C-4693-B523-B499A0320C3A}.Debug|x64.Build.0 = Debug|x64
		{491DC6E6-840C-4693-B523-B499A0320C3A}.Release|Win32.ActiveCfg = Release|Win32
		{491DC6E6-840C-4693-B523-B499A0320C3A}.Release|Win32.Build.0 = Release|Win32
		{491DC6E6-840C-4693-B523-B499A0320C3A}.Release|x64.ActiveCfg = Release|x64
		{491DC6E6-840C-4693-B523-B499A0320C3A}.Release|x64.Build.0 = Release|x64
	EndGlobalSection
	GlobalSection(SolutionProperties) = preSolution
		HideSolutionNode = FALSE
	EndGlobalSection
EndGlobal
````

## File: HelloWorld/HelloWorld.vcproj
````
<?xml version="1.0" encoding="Windows-1252"?>
<VisualStudioProject
	ProjectType="Visual C++"
	Version="8.00"
	Name="HelloWorld"
	ProjectGUID="{491DC6E6-840C-4693-B523-B499A0320C3A}"
	RootNamespace="MyExtObj"
	Keyword="Win32Proj"
	>
	<Platforms>
		<Platform
			Name="Win32"
		/>
	</Platforms>
	<ToolFiles>
	</ToolFiles>
	<Configurations>
		<Configuration
			Name="Debug|Win32"
			OutputDirectory="$(SolutionDir)$(ConfigurationName)"
			IntermediateDirectory="$(ConfigurationName)"
			ConfigurationType="2"
			CharacterSet="1"
			>
			<Tool
				Name="VCPreBuildEventTool"
			/>
			<Tool
				Name="VCCustomBuildTool"
			/>
			<Tool
				Name="VCXMLDataGeneratorTool"
			/>
			<Tool
				Name="VCWebServiceProxyGeneratorTool"
			/>
			<Tool
				Name="VCMIDLTool"
			/>
			<Tool
				Name="VCCLCompilerTool"
				Optimization="0"
				AdditionalIncludeDirectories=".\include"
				PreprocessorDefinitions="WIN32;_DEBUG;_WINDOWS;_USRDLL;BASICEXTERNALOBJECT_EXPORTS"
				MinimalRebuild="true"
				BasicRuntimeChecks="3"
				RuntimeLibrary="3"
				StructMemberAlignment="0"
				UsePrecompiledHeader="0"
				WarningLevel="3"
				Detect64BitPortabilityProblems="true"
				DebugInformationFormat="4"
				CompileAs="2"
			/>
			<Tool
				Name="VCManagedResourceCompilerTool"
			/>
			<Tool
				Name="VCResourceCompilerTool"
			/>
			<Tool
				Name="VCPreLinkEventTool"
			/>
			<Tool
				Name="VCLinkerTool"
				LinkIncremental="2"
				GenerateDebugInformation="true"
				SubSystem="2"
				TargetMachine="1"
			/>
			<Tool
				Name="VCALinkTool"
			/>
			<Tool
				Name="VCManifestTool"
			/>
			<Tool
				Name="VCXDCMakeTool"
			/>
			<Tool
				Name="VCBscMakeTool"
			/>
			<Tool
				Name="VCFxCopTool"
			/>
			<Tool
				Name="VCAppVerifierTool"
			/>
			<Tool
				Name="VCWebDeploymentTool"
			/>
			<Tool
				Name="VCPostBuildEventTool"
			/>
		</Configuration>
		<Configuration
			Name="Release|Win32"
			OutputDirectory="$(SolutionDir)$(ConfigurationName)"
			IntermediateDirectory="$(ConfigurationName)"
			ConfigurationType="2"
			CharacterSet="1"
			WholeProgramOptimization="1"
			>
			<Tool
				Name="VCPreBuildEventTool"
			/>
			<Tool
				Name="VCCustomBuildTool"
			/>
			<Tool
				Name="VCXMLDataGeneratorTool"
			/>
			<Tool
				Name="VCWebServiceProxyGeneratorTool"
			/>
			<Tool
				Name="VCMIDLTool"
			/>
			<Tool
				Name="VCCLCompilerTool"
				AdditionalIncludeDirectories=".\include"
				PreprocessorDefinitions="WIN32;NDEBUG;_WINDOWS;_USRDLL;BASICEXTERNALOBJECT_EXPORTS"
				RuntimeLibrary="2"
				StructMemberAlignment="1"
				UsePrecompiledHeader="0"
				WarningLevel="3"
				Detect64BitPortabilityProblems="true"
				DebugInformationFormat="3"
				CompileAs="2"
			/>
			<Tool
				Name="VCManagedResourceCompilerTool"
			/>
			<Tool
				Name="VCResourceCompilerTool"
			/>
			<Tool
				Name="VCPreLinkEventTool"
			/>
			<Tool
				Name="VCLinkerTool"
				LinkIncremental="1"
				GenerateDebugInformation="true"
				SubSystem="2"
				OptimizeReferences="2"
				EnableCOMDATFolding="2"
				TargetMachine="1"
			/>
			<Tool
				Name="VCALinkTool"
			/>
			<Tool
				Name="VCManifestTool"
			/>
			<Tool
				Name="VCXDCMakeTool"
			/>
			<Tool
				Name="VCBscMakeTool"
			/>
			<Tool
				Name="VCFxCopTool"
			/>
			<Tool
				Name="VCAppVerifierTool"
			/>
			<Tool
				Name="VCWebDeploymentTool"
			/>
			<Tool
				Name="VCPostBuildEventTool"
			/>
		</Configuration>
	</Configurations>
	<References>
	</References>
	<Files>
		<Filter
			Name="Source Files"
			Filter="cpp;c;cc;cxx;def;odl;idl;hpj;bat;asm;asmx"
			UniqueIdentifier="{4FC737F1-C7A5-4376-A066-2A32D752A2FF}"
			>
			<File
				RelativePath=".\HelloWorld.cpp"
				>
			</File>
		</Filter>
		<Filter
			Name="Header Files"
			Filter="h;hpp;hxx;hm;inl;inc;xsd"
			UniqueIdentifier="{93995380-89BD-4b04-88EB-625FBE52EBFB}"
			>
			<File
				RelativePath=".\include\SoCClient.h"
				>
			</File>
			<File
				RelativePath=".\include\SoSharedLibDefs.h"
				>
			</File>
		</Filter>
	</Files>
	<Globals>
	</Globals>
</VisualStudioProject>
````

## File: HelloWorld/HelloWorld.vcxproj
````
<?xml version="1.0" encoding="utf-8"?>
<Project DefaultTargets="Build" ToolsVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <ItemGroup Label="ProjectConfigurations">
    <ProjectConfiguration Include="Debug|Win32">
      <Configuration>Debug</Configuration>
      <Platform>Win32</Platform>
    </ProjectConfiguration>
    <ProjectConfiguration Include="Debug|x64">
      <Configuration>Debug</Configuration>
      <Platform>x64</Platform>
    </ProjectConfiguration>
    <ProjectConfiguration Include="Release|Win32">
      <Configuration>Release</Configuration>
      <Platform>Win32</Platform>
    </ProjectConfiguration>
    <ProjectConfiguration Include="Release|x64">
      <Configuration>Release</Configuration>
      <Platform>x64</Platform>
    </ProjectConfiguration>
  </ItemGroup>
  <ItemGroup>
    <ClInclude Include=".\include\SoSharedLibDefs.h" />
    <ClInclude Include="HellowWorld.h" />
  </ItemGroup>
  <ItemGroup>
    <ClCompile Include=".\HelloWorld.cpp" />
    <ClCompile Include="AEGP_SuiteHandler.cpp" />
    <ClCompile Include="MissingSuiteError.cpp" />
  </ItemGroup>
  <PropertyGroup Label="Globals">
    <ProjectGuid>{491DC6E6-840C-4693-B523-B499A0320C3A}</ProjectGuid>
    <RootNamespace>MyExtObj</RootNamespace>
    <Keyword>Win32Proj</Keyword>
    <ProjectName>HelloWorld</ProjectName>
    <WindowsTargetPlatformVersion>10.0</WindowsTargetPlatformVersion>
  </PropertyGroup>
  <Import Project="$(VCTargetsPath)\Microsoft.Cpp.Default.props" />
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|Win32'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <CharacterSet>Unicode</CharacterSet>
    <WholeProgramOptimization>true</WholeProgramOptimization>
    <PlatformToolset>v143</PlatformToolset>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <CharacterSet>Unicode</CharacterSet>
    <WholeProgramOptimization>true</WholeProgramOptimization>
    <PlatformToolset>v143</PlatformToolset>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <CharacterSet>Unicode</CharacterSet>
    <PlatformToolset>v143</PlatformToolset>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" Label="Configuration">
    <ConfigurationType>DynamicLibrary</ConfigurationType>
    <CharacterSet>Unicode</CharacterSet>
    <PlatformToolset>v143</PlatformToolset>
  </PropertyGroup>
  <Import Project="$(VCTargetsPath)\Microsoft.Cpp.props" />
  <ImportGroup Label="ExtensionSettings">
  </ImportGroup>
  <ImportGroup Condition="'$(Configuration)|$(Platform)'=='Release|Win32'" Label="PropertySheets">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
  </ImportGroup>
  <ImportGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'" Label="PropertySheets">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
  </ImportGroup>
  <ImportGroup Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'" Label="PropertySheets">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
  </ImportGroup>
  <ImportGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" Label="PropertySheets">
    <Import Project="$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props" Condition="exists('$(UserRootDir)\Microsoft.Cpp.$(Platform).user.props')" Label="LocalAppDataPlatform" />
  </ImportGroup>
  <PropertyGroup Label="UserMacros" />
  <PropertyGroup>
    <_ProjectFileVersion>10.0.40219.1</_ProjectFileVersion>
    <OutDir Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">$(SolutionDir)$(Configuration)\</OutDir>
    <IntDir Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">$(Configuration)\</IntDir>
    <LinkIncremental Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">true</LinkIncremental>
    <LinkIncremental Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">true</LinkIncremental>
    <OutDir Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">$(SolutionDir)$(Configuration)\</OutDir>
    <IntDir Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">$(Configuration)\</IntDir>
    <LinkIncremental Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">false</LinkIncremental>
    <LinkIncremental Condition="'$(Configuration)|$(Platform)'=='Release|x64'">false</LinkIncremental>
    <CodeAnalysisRuleSet Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">AllRules.ruleset</CodeAnalysisRuleSet>
    <CodeAnalysisRuleSet Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">AllRules.ruleset</CodeAnalysisRuleSet>
    <CodeAnalysisRules Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'" />
    <CodeAnalysisRules Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" />
    <CodeAnalysisRuleAssemblies Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'" />
    <CodeAnalysisRuleAssemblies Condition="'$(Configuration)|$(Platform)'=='Debug|x64'" />
    <CodeAnalysisRuleSet Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">AllRules.ruleset</CodeAnalysisRuleSet>
    <CodeAnalysisRuleSet Condition="'$(Configuration)|$(Platform)'=='Release|x64'">AllRules.ruleset</CodeAnalysisRuleSet>
    <CodeAnalysisRules Condition="'$(Configuration)|$(Platform)'=='Release|Win32'" />
    <CodeAnalysisRules Condition="'$(Configuration)|$(Platform)'=='Release|x64'" />
    <CodeAnalysisRuleAssemblies Condition="'$(Configuration)|$(Platform)'=='Release|Win32'" />
    <CodeAnalysisRuleAssemblies Condition="'$(Configuration)|$(Platform)'=='Release|x64'" />
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <OutDir>$(SolutionDir)$(Platform)\$(Configuration)\dll\</OutDir>
    <IncludePath>C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Util;C:\Users\tjerf\vcpkg\installed\x64-windows-static\include;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers</IncludePath>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <OutDir>$(SolutionDir)$(Platform)\$(Configuration)\dll\</OutDir>
    <IncludePath>C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Util;C:\Users\tjerf\vcpkg\installed\x64-windows-static\include;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers</IncludePath>
  </PropertyGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">
    <ClCompile>
      <Optimization>Disabled</Optimization>
      <AdditionalIncludeDirectories>.\include;%(AdditionalIncludeDirectories)</AdditionalIncludeDirectories>
      <PreprocessorDefinitions>WIN32;_DEBUG;_WINDOWS;_USRDLL;BASICEXTERNALOBJECT_EXPORTS;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <MinimalRebuild>true</MinimalRebuild>
      <BasicRuntimeChecks>EnableFastChecks</BasicRuntimeChecks>
      <RuntimeLibrary>MultiThreadedDebugDLL</RuntimeLibrary>
      <StructMemberAlignment>Default</StructMemberAlignment>
      <PrecompiledHeader>
      </PrecompiledHeader>
      <WarningLevel>Level3</WarningLevel>
      <DebugInformationFormat>EditAndContinue</DebugInformationFormat>
      <CompileAs>CompileAsCpp</CompileAs>
    </ClCompile>
    <Link>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <SubSystem>Windows</SubSystem>
      <TargetMachine>MachineX86</TargetMachine>
    </Link>
  </ItemDefinitionGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <ClCompile>
      <Optimization>Disabled</Optimization>
      <AdditionalIncludeDirectories>C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers\adobesdk\drawbotsuite;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers\adobesdk;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers\SP;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers\adobesdk\config;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Util;%(AdditionalIncludeDirectories)</AdditionalIncludeDirectories>
      <PreprocessorDefinitions>WIN32;_DEBUG;_WINDOWS;_USRDLL;BASICEXTERNALOBJECT_EXPORTS;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <BasicRuntimeChecks>EnableFastChecks</BasicRuntimeChecks>
      <RuntimeLibrary>MultiThreadedDebugDLL</RuntimeLibrary>
      <StructMemberAlignment>Default</StructMemberAlignment>
      <PrecompiledHeader>
      </PrecompiledHeader>
      <WarningLevel>Level3</WarningLevel>
      <DebugInformationFormat>ProgramDatabase</DebugInformationFormat>
      <CompileAs>CompileAsCpp</CompileAs>
    </ClCompile>
    <Link>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <SubSystem>Windows</SubSystem>
    </Link>
  </ItemDefinitionGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">
    <ClCompile>
      <AdditionalIncludeDirectories>.\include;%(AdditionalIncludeDirectories)</AdditionalIncludeDirectories>
      <PreprocessorDefinitions>WIN32;NDEBUG;_WINDOWS;_USRDLL;BASICEXTERNALOBJECT_EXPORTS;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <RuntimeLibrary>MultiThreadedDLL</RuntimeLibrary>
      <StructMemberAlignment>1Byte</StructMemberAlignment>
      <PrecompiledHeader>
      </PrecompiledHeader>
      <WarningLevel>Level3</WarningLevel>
      <DebugInformationFormat>ProgramDatabase</DebugInformationFormat>
      <CompileAs>CompileAsCpp</CompileAs>
    </ClCompile>
    <Link>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <SubSystem>Windows</SubSystem>
      <OptimizeReferences>true</OptimizeReferences>
      <EnableCOMDATFolding>true</EnableCOMDATFolding>
      <TargetMachine>MachineX86</TargetMachine>
    </Link>
  </ItemDefinitionGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <ClCompile>
      <AdditionalIncludeDirectories>C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers\adobesdk\drawbotsuite;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers\adobesdk;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers\SP;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers\adobesdk\config;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Headers;C:\Users\tjerf\Desktop\AfterEffectsSDK\Examples\Util;%(AdditionalIncludeDirectories)</AdditionalIncludeDirectories>
      <PreprocessorDefinitions>WIN32;NDEBUG;_WINDOWS;_USRDLL;BASICEXTERNALOBJECT_EXPORTS;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <RuntimeLibrary>MultiThreadedDLL</RuntimeLibrary>
      <StructMemberAlignment>1Byte</StructMemberAlignment>
      <PrecompiledHeader>
      </PrecompiledHeader>
      <WarningLevel>Level3</WarningLevel>
      <DebugInformationFormat>ProgramDatabase</DebugInformationFormat>
      <CompileAs>CompileAsCpp</CompileAs>
    </ClCompile>
    <Link>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <SubSystem>Windows</SubSystem>
      <OptimizeReferences>true</OptimizeReferences>
      <EnableCOMDATFolding>true</EnableCOMDATFolding>
    </Link>
  </ItemDefinitionGroup>
  <Import Project="$(VCTargetsPath)\Microsoft.Cpp.targets" />
  <ImportGroup Label="ExtensionTargets">
  </ImportGroup>
</Project>
````

## File: HelloWorld/HelloWorld.vcxproj.filters
````
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="4.0" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <ItemGroup>
    <Filter Include="Source Files">
      <UniqueIdentifier>{4FC737F1-C7A5-4376-A066-2A32D752A2FF}</UniqueIdentifier>
      <Extensions>cpp;c;cc;cxx;def;odl;idl;hpj;bat;asm;asmx</Extensions>
    </Filter>
    <Filter Include="Header Files">
      <UniqueIdentifier>{93995380-89BD-4b04-88EB-625FBE52EBFB}</UniqueIdentifier>
      <Extensions>h;hpp;hxx;hm;inl;inc;xsd</Extensions>
    </Filter>
  </ItemGroup>
  <ItemGroup>
    <ClCompile Include=".\HelloWorld.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
    <ClCompile Include="AEGP_SuiteHandler.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
    <ClCompile Include="MissingSuiteError.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
  </ItemGroup>
  <ItemGroup>
    <ClInclude Include=".\include\SoSharedLibDefs.h">
      <Filter>Header Files</Filter>
    </ClInclude>
    <ClInclude Include="HellowWorld.h">
      <Filter>Header Files</Filter>
    </ClInclude>
  </ItemGroup>
</Project>
````

## File: HelloWorld/HelloWorld.vcxproj.user
````
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="Current" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <PropertyGroup />
</Project>
````

## File: HelloWorld/LICENSE
````
MIT License

Copyright (c) 2019 bryful

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
````

## File: HelloWorld/README.md
````markdown
# HellowWorld "ExternalObject"

[CEP & C++ネイティブコードによるPhotoShop拡張](https://qiita.com/MAA_/items/b1a35ab73af9f7b327e0) <br>
にあったExternalObjectサンプルをVisual studio 2022でビルド出来るようにしました。

* ./include<br>必要なAdobe Extend Tool kitにあったヘッダ
* ./jsx<br>サンプルのjsxファイル
* HellowWorld.cpp<br>サンプルの奴。機能のほとんどが入ってます。
* 後はVisualStudio2022のファイルです

以上の者だけでビルドが出来ます。<br>
詳細は上記の記事を読んでください。
<br>

ビルドすると<x64>のフォルダの中に<Release>/<Debug>フォルダの中のdllフォルダの中にDLLが出力されます。<br>
<br>
とりあえず、そのdllとHellowWorld.jsxをScriptsフォルダに入れてjsxを実行して確認ができます。<br>


## ExternalObject

<b>ExternalObject</>とはぶっちゃけて言えばC++で作るプラグインのシステムで、After Effectsスクリプトの機能拡張を行う者です。<br>

Adobe ExtendScript Toolkit CCがインストールされていれば、以下の場所にある<b>JavaScript Tools Guide CC.pdf</b>に詳細な事が説明されてますが、[上記](https://qiita.com/MAA_/items/b1a35ab73af9f7b327e0) の記事に簡単に説明されていたので、ちょっと試して見ました。

```
C:\Program Files (x86)\Adobe\Adobe ExtendScript Toolkit CC\SDK
```

とりあえず、HellowWOrldをビルド出来るようにしてみました。<br>


## License

This software is released under the MIT License, see LICENSE<br>

## Authors

bry-ful(Hiroshi Furuhashi)<br>

twitter:[bryful] (https://twitter.com/bryful) <br>

bryful@gmail.com<br>

# References

[CEP & C++ネイティブコードによるPhotoShop拡張 https://qiita.com/MAA_/items/b1a35ab73af9f7b327e0](https://qiita.com/MAA_/items/b1a35ab73af9f7b327e0) <br>
````

## File: HelloWorld/samplelib.h
````c
#pragma once
























#if defined (_WINDOWS) || defined (HPUX_ACC)
#define SAMPLIB __declspec(dllexport)
#elif defined(__APPLE__)
#define SAMPLIB __attribute__((visibility("default")))
#elif defined (LINUX) || defined (SOLARIS) || defined (AIX_VACPP6)
#define DLL_EXPORT




#else
#error Unsupported compiler
#endif
````

## File: HelloWorld/Setup_HelloWorld.vdproj
````
"DeployProject"
{
"VSVersion" = "3:800"
"ProjectType" = "8:{978C614F-708E-4E1A-B201-565925725DBA}"
"IsWebType" = "8:FALSE"
"ProjectName" = "8:Setup_HelloWorld"
"LanguageId" = "3:1041"
"CodePage" = "3:932"
"UILanguageId" = "3:1041"
"SccProjectName" = "8:"
"SccLocalPath" = "8:"
"SccAuxPath" = "8:"
"SccProvider" = "8:"
    "Hierarchy"
    {
    }
    "Configurations"
    {
        "Debug"
        {
        "DisplayName" = "8:Debug"
        "IsDebugOnly" = "11:TRUE"
        "IsReleaseOnly" = "11:FALSE"
        "OutputFilename" = "8:.\\Install\\Debug\\Setup_HelloWorld.msi"
        "PackageFilesAs" = "3:2"
        "PackageFileSize" = "3:-2147483648"
        "CabType" = "3:1"
        "Compression" = "3:2"
        "SignOutput" = "11:FALSE"
        "CertificateFile" = "8:"
        "PrivateKeyFile" = "8:"
        "TimeStampServer" = "8:"
        "InstallerBootstrapper" = "3:2"
            "BootstrapperCfg:{63ACBE69-63AA-4F98-B2B6-99F9E24495F2}"
            {
            "Enabled" = "11:TRUE"
            "PromptEnabled" = "11:TRUE"
            "PrerequisitesLocation" = "2:1"
            "Url" = "8:"
            "ComponentsUrl" = "8:"
                "Items"
                {
                }
            }
        }
        "Release"
        {
        "DisplayName" = "8:Release"
        "IsDebugOnly" = "11:FALSE"
        "IsReleaseOnly" = "11:TRUE"
        "OutputFilename" = "8:.\\Install\\Release\\Setup_HelloWorld.msi"
        "PackageFilesAs" = "3:2"
        "PackageFileSize" = "3:-2147483648"
        "CabType" = "3:1"
        "Compression" = "3:2"
        "SignOutput" = "11:FALSE"
        "CertificateFile" = "8:"
        "PrivateKeyFile" = "8:"
        "TimeStampServer" = "8:"
        "InstallerBootstrapper" = "3:2"
            "BootstrapperCfg:{63ACBE69-63AA-4F98-B2B6-99F9E24495F2}"
            {
            "Enabled" = "11:TRUE"
            "PromptEnabled" = "11:TRUE"
            "PrerequisitesLocation" = "2:1"
            "Url" = "8:"
            "ComponentsUrl" = "8:"
                "Items"
                {
                    "{EDC2488A-8267-493A-A98E-7D9C3B36CDF3}:.NETFramework,Version=v4.7.2"
                    {
                    "Name" = "8:Microsoft .NET Framework 4.7.2 (x86 and x64)"
                    "ProductCode" = "8:.NETFramework,Version=v4.7.2"
                    }
                }
            }
        }
    }
    "Deployable"
    {
        "CustomAction"
        {
        }
        "DefaultFeature"
        {
        "Name" = "8:DefaultFeature"
        "Title" = "8:"
        "Description" = "8:"
        }
        "ExternalPersistence"
        {
            "LaunchCondition"
            {
            }
        }
        "File"
        {
        }
        "FileType"
        {
        }
        "Folder"
        {
            "{1525181F-901A-416C-8A58-119130FE478E}:_1587FA92A5E2484AAB2563DD1F209A08"
            {
            "Name" = "8:#1916"
            "AlwaysCreate" = "11:FALSE"
            "Condition" = "8:"
            "Transitive" = "11:FALSE"
            "Property" = "8:DesktopFolder"
                "Folders"
                {
                }
            }
            "{1525181F-901A-416C-8A58-119130FE478E}:_2CE66367EF4B4F8CBFC80CDC57C1279D"
            {
            "Name" = "8:#1919"
            "AlwaysCreate" = "11:FALSE"
            "Condition" = "8:"
            "Transitive" = "11:FALSE"
            "Property" = "8:ProgramMenuFolder"
                "Folders"
                {
                }
            }
            "{3C67513D-01DD-4637-8A68-80971EB9504F}:_7FCF70061CEB4EA6A409F9FB7FC9687E"
            {
            "DefaultLocation" = "8:[ProgramFiles64Folder][Manufacturer]\\[ProductName]"
            "Name" = "8:#1925"
            "AlwaysCreate" = "11:FALSE"
            "Condition" = "8:"
            "Transitive" = "11:FALSE"
            "Property" = "8:TARGETDIR"
                "Folders"
                {
                }
            }
        }
        "LaunchCondition"
        {
        }
        "Locator"
        {
        }
        "MsiBootstrapper"
        {
        "LangId" = "3:1041"
        "RequiresElevation" = "11:FALSE"
        }
        "Product"
        {
        "Name" = "8:Microsoft Visual Studio"
        "ProductName" = "8:HellowWorld"
        "ProductCode" = "8:{F734452A-76A9-41EA-905C-EB84D47927A1}"
        "PackageCode" = "8:{A1DEF132-0D1D-4428-A658-EE018BD27020}"
        "UpgradeCode" = "8:{EEF85D23-3E17-4499-B9B9-CAB5C6BA1C49}"
        "AspNetVersion" = "8:4.0.30319.0"
        "RestartWWWService" = "11:FALSE"
        "RemovePreviousVersions" = "11:TRUE"
        "DetectNewerInstalledVersion" = "11:TRUE"
        "InstallAllUsers" = "11:TRUE"
        "ProductVersion" = "8:1.0.0"
        "Manufacturer" = "8:bryful"
        "ARPHELPTELEPHONE" = "8:"
        "ARPHELPLINK" = "8:"
        "Title" = "8:Setup_HellowWorld"
        "Subject" = "8:"
        "ARPCONTACT" = "8:bryful"
        "Keywords" = "8:"
        "ARPCOMMENTS" = "8:"
        "ARPURLINFOABOUT" = "8:"
        "ARPPRODUCTICON" = "8:"
        "ARPIconIndex" = "3:0"
        "SearchPath" = "8:"
        "UseSystemSearchPath" = "11:TRUE"
        "TargetPlatform" = "3:1"
        "PreBuildEvent" = "8:"
        "PostBuildEvent" = "8:"
        "RunPostBuildEvent" = "3:0"
        }
        "Registry"
        {
            "HKLM"
            {
                "Keys"
                {
                    "{60EA8692-D2D5-43EB-80DC-7906BF13D6EF}:_BD773D57EF0F49B6BEBA3EE9972B0777"
                    {
                    "Name" = "8:Software"
                    "Condition" = "8:"
                    "AlwaysCreate" = "11:FALSE"
                    "DeleteAtUninstall" = "11:FALSE"
                    "Transitive" = "11:FALSE"
                        "Keys"
                        {
                            "{60EA8692-D2D5-43EB-80DC-7906BF13D6EF}:_6D12E86ABAAF4BD1972DFC91EB8800A1"
                            {
                            "Name" = "8:[Manufacturer]"
                            "Condition" = "8:"
                            "AlwaysCreate" = "11:FALSE"
                            "DeleteAtUninstall" = "11:FALSE"
                            "Transitive" = "11:FALSE"
                                "Keys"
                                {
                                }
                                "Values"
                                {
                                }
                            }
                        }
                        "Values"
                        {
                        }
                    }
                }
            }
            "HKCU"
            {
                "Keys"
                {
                    "{60EA8692-D2D5-43EB-80DC-7906BF13D6EF}:_CA3975E7BCCF4DF19B13E69B95007D6C"
                    {
                    "Name" = "8:Software"
                    "Condition" = "8:"
                    "AlwaysCreate" = "11:FALSE"
                    "DeleteAtUninstall" = "11:FALSE"
                    "Transitive" = "11:FALSE"
                        "Keys"
                        {
                            "{60EA8692-D2D5-43EB-80DC-7906BF13D6EF}:_27EB3B9AD7954F579766894539187604"
                            {
                            "Name" = "8:[Manufacturer]"
                            "Condition" = "8:"
                            "AlwaysCreate" = "11:FALSE"
                            "DeleteAtUninstall" = "11:FALSE"
                            "Transitive" = "11:FALSE"
                                "Keys"
                                {
                                }
                                "Values"
                                {
                                }
                            }
                        }
                        "Values"
                        {
                        }
                    }
                }
            }
            "HKCR"
            {
                "Keys"
                {
                }
            }
            "HKU"
            {
                "Keys"
                {
                }
            }
            "HKPU"
            {
                "Keys"
                {
                }
            }
        }
        "Sequences"
        {
        }
        "Shortcut"
        {
        }
        "UserInterface"
        {
            "{2479F3F5-0309-486D-8047-8187E2CE5BA0}:_27D1B3CDF5D14D5DA5B2D41EF42BA3BE"
            {
            "UseDynamicProperties" = "11:FALSE"
            "IsDependency" = "11:FALSE"
            "SourcePath" = "8:<VsdDialogDir>\\VsdUserInterface.wim"
            }
            "{2479F3F5-0309-486D-8047-8187E2CE5BA0}:_42DA558477374D91B5016EA91505067F"
            {
            "UseDynamicProperties" = "11:FALSE"
            "IsDependency" = "11:FALSE"
            "SourcePath" = "8:<VsdDialogDir>\\VsdBasicDialogs.wim"
            }
            "{DF760B10-853B-4699-99F2-AFF7185B4A62}:_45D793F3F9E24890BEEF0B339FBF6D8D"
            {
            "Name" = "8:#1902"
            "Sequence" = "3:1"
            "Attributes" = "3:3"
                "Dialogs"
                {
                    "{688940B3-5CA9-4162-8DEE-2993FA9D8CBC}:_E1C1F1E302D142799C9C252F3D195376"
                    {
                    "Sequence" = "3:100"
                    "DisplayName" = "8:完了"
                    "UseDynamicProperties" = "11:TRUE"
                    "IsDependency" = "11:FALSE"
                    "SourcePath" = "8:<VsdDialogDir>\\VsdFinishedDlg.wid"
                        "Properties"
                        {
                            "BannerBitmap"
                            {
                            "Name" = "8:BannerBitmap"
                            "DisplayName" = "8:#1001"
                            "Description" = "8:#1101"
                            "Type" = "3:8"
                            "ContextData" = "8:Bitmap"
                            "Attributes" = "3:4"
                            "Setting" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                            "UpdateText"
                            {
                            "Name" = "8:UpdateText"
                            "DisplayName" = "8:#1058"
                            "Description" = "8:#1158"
                            "Type" = "3:15"
                            "ContextData" = "8:"
                            "Attributes" = "3:0"
                            "Setting" = "3:1"
                            "Value" = "8:#1258"
                            "DefaultValue" = "8:#1258"
                            "UsePlugInResources" = "11:TRUE"
                            }
                        }
                    }
                }
            }
            "{DF760B10-853B-4699-99F2-AFF7185B4A62}:_6B71D67730DE43019B9658D2620D51FB"
            {
            "Name" = "8:#1900"
            "Sequence" = "3:2"
            "Attributes" = "3:1"
                "Dialogs"
                {
                    "{688940B3-5CA9-4162-8DEE-2993FA9D8CBC}:_0ACA5DCB8F5C48668483B6A2C7C76A99"
                    {
                    "Sequence" = "3:100"
                    "DisplayName" = "8:ようこそ"
                    "UseDynamicProperties" = "11:TRUE"
                    "IsDependency" = "11:FALSE"
                    "SourcePath" = "8:<VsdDialogDir>\\VsdAdminWelcomeDlg.wid"
                        "Properties"
                        {
                            "BannerBitmap"
                            {
                            "Name" = "8:BannerBitmap"
                            "DisplayName" = "8:#1001"
                            "Description" = "8:#1101"
                            "Type" = "3:8"
                            "ContextData" = "8:Bitmap"
                            "Attributes" = "3:4"
                            "Setting" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                            "CopyrightWarning"
                            {
                            "Name" = "8:CopyrightWarning"
                            "DisplayName" = "8:#1002"
                            "Description" = "8:#1102"
                            "Type" = "3:3"
                            "ContextData" = "8:"
                            "Attributes" = "3:0"
                            "Setting" = "3:1"
                            "Value" = "8:#1202"
                            "DefaultValue" = "8:#1202"
                            "UsePlugInResources" = "11:TRUE"
                            }
                            "Welcome"
                            {
                            "Name" = "8:Welcome"
                            "DisplayName" = "8:#1003"
                            "Description" = "8:#1103"
                            "Type" = "3:3"
                            "ContextData" = "8:"
                            "Attributes" = "3:0"
                            "Setting" = "3:1"
                            "Value" = "8:#1203"
                            "DefaultValue" = "8:#1203"
                            "UsePlugInResources" = "11:TRUE"
                            }
                        }
                    }
                    "{688940B3-5CA9-4162-8DEE-2993FA9D8CBC}:_8CA6705F212347EDAB95F5CDE5BEA53E"
                    {
                    "Sequence" = "3:300"
                    "DisplayName" = "8:インストールの確認"
                    "UseDynamicProperties" = "11:TRUE"
                    "IsDependency" = "11:FALSE"
                    "SourcePath" = "8:<VsdDialogDir>\\VsdAdminConfirmDlg.wid"
                        "Properties"
                        {
                            "BannerBitmap"
                            {
                            "Name" = "8:BannerBitmap"
                            "DisplayName" = "8:#1001"
                            "Description" = "8:#1101"
                            "Type" = "3:8"
                            "ContextData" = "8:Bitmap"
                            "Attributes" = "3:4"
                            "Setting" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                        }
                    }
                    "{688940B3-5CA9-4162-8DEE-2993FA9D8CBC}:_DEDD416C888B4406AED5EC2E241694A2"
                    {
                    "Sequence" = "3:200"
                    "DisplayName" = "8:インストール フォルダー"
                    "UseDynamicProperties" = "11:TRUE"
                    "IsDependency" = "11:FALSE"
                    "SourcePath" = "8:<VsdDialogDir>\\VsdAdminFolderDlg.wid"
                        "Properties"
                        {
                            "BannerBitmap"
                            {
                            "Name" = "8:BannerBitmap"
                            "DisplayName" = "8:#1001"
                            "Description" = "8:#1101"
                            "Type" = "3:8"
                            "ContextData" = "8:Bitmap"
                            "Attributes" = "3:4"
                            "Setting" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                        }
                    }
                }
            }
            "{DF760B10-853B-4699-99F2-AFF7185B4A62}:_D1EADD7D6A724B4F8016C5B95FB40F6B"
            {
            "Name" = "8:#1901"
            "Sequence" = "3:2"
            "Attributes" = "3:2"
                "Dialogs"
                {
                    "{688940B3-5CA9-4162-8DEE-2993FA9D8CBC}:_F3F038E992B842748CAE19596F040DC5"
                    {
                    "Sequence" = "3:100"
                    "DisplayName" = "8:進行状況"
                    "UseDynamicProperties" = "11:TRUE"
                    "IsDependency" = "11:FALSE"
                    "SourcePath" = "8:<VsdDialogDir>\\VsdAdminProgressDlg.wid"
                        "Properties"
                        {
                            "BannerBitmap"
                            {
                            "Name" = "8:BannerBitmap"
                            "DisplayName" = "8:#1001"
                            "Description" = "8:#1101"
                            "Type" = "3:8"
                            "ContextData" = "8:Bitmap"
                            "Attributes" = "3:4"
                            "Setting" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                            "ShowProgress"
                            {
                            "Name" = "8:ShowProgress"
                            "DisplayName" = "8:#1009"
                            "Description" = "8:#1109"
                            "Type" = "3:5"
                            "ContextData" = "8:1;True=1;False=0"
                            "Attributes" = "3:0"
                            "Setting" = "3:0"
                            "Value" = "3:1"
                            "DefaultValue" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                        }
                    }
                }
            }
            "{DF760B10-853B-4699-99F2-AFF7185B4A62}:_E9CAF3D186E84307B9C5FC5D556F180B"
            {
            "Name" = "8:#1900"
            "Sequence" = "3:1"
            "Attributes" = "3:1"
                "Dialogs"
                {
                    "{688940B3-5CA9-4162-8DEE-2993FA9D8CBC}:_5CDA6BDFFF464292A1543FB67C79DF9C"
                    {
                    "Sequence" = "3:200"
                    "DisplayName" = "8:インストール フォルダー"
                    "UseDynamicProperties" = "11:TRUE"
                    "IsDependency" = "11:FALSE"
                    "SourcePath" = "8:<VsdDialogDir>\\VsdFolderDlg.wid"
                        "Properties"
                        {
                            "BannerBitmap"
                            {
                            "Name" = "8:BannerBitmap"
                            "DisplayName" = "8:#1001"
                            "Description" = "8:#1101"
                            "Type" = "3:8"
                            "ContextData" = "8:Bitmap"
                            "Attributes" = "3:4"
                            "Setting" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                            "InstallAllUsersVisible"
                            {
                            "Name" = "8:InstallAllUsersVisible"
                            "DisplayName" = "8:#1059"
                            "Description" = "8:#1159"
                            "Type" = "3:5"
                            "ContextData" = "8:1;True=1;False=0"
                            "Attributes" = "3:0"
                            "Setting" = "3:0"
                            "Value" = "3:1"
                            "DefaultValue" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                        }
                    }
                    "{688940B3-5CA9-4162-8DEE-2993FA9D8CBC}:_C37E4FD59BF647EEB49BAD9A7A3C7EE9"
                    {
                    "Sequence" = "3:100"
                    "DisplayName" = "8:ようこそ"
                    "UseDynamicProperties" = "11:TRUE"
                    "IsDependency" = "11:FALSE"
                    "SourcePath" = "8:<VsdDialogDir>\\VsdWelcomeDlg.wid"
                        "Properties"
                        {
                            "BannerBitmap"
                            {
                            "Name" = "8:BannerBitmap"
                            "DisplayName" = "8:#1001"
                            "Description" = "8:#1101"
                            "Type" = "3:8"
                            "ContextData" = "8:Bitmap"
                            "Attributes" = "3:4"
                            "Setting" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                            "CopyrightWarning"
                            {
                            "Name" = "8:CopyrightWarning"
                            "DisplayName" = "8:#1002"
                            "Description" = "8:#1102"
                            "Type" = "3:3"
                            "ContextData" = "8:"
                            "Attributes" = "3:0"
                            "Setting" = "3:1"
                            "Value" = "8:#1202"
                            "DefaultValue" = "8:#1202"
                            "UsePlugInResources" = "11:TRUE"
                            }
                            "Welcome"
                            {
                            "Name" = "8:Welcome"
                            "DisplayName" = "8:#1003"
                            "Description" = "8:#1103"
                            "Type" = "3:3"
                            "ContextData" = "8:"
                            "Attributes" = "3:0"
                            "Setting" = "3:1"
                            "Value" = "8:#1203"
                            "DefaultValue" = "8:#1203"
                            "UsePlugInResources" = "11:TRUE"
                            }
                        }
                    }
                    "{688940B3-5CA9-4162-8DEE-2993FA9D8CBC}:_DECC09EFC6954379994DA3561D2C6D27"
                    {
                    "Sequence" = "3:300"
                    "DisplayName" = "8:インストールの確認"
                    "UseDynamicProperties" = "11:TRUE"
                    "IsDependency" = "11:FALSE"
                    "SourcePath" = "8:<VsdDialogDir>\\VsdConfirmDlg.wid"
                        "Properties"
                        {
                            "BannerBitmap"
                            {
                            "Name" = "8:BannerBitmap"
                            "DisplayName" = "8:#1001"
                            "Description" = "8:#1101"
                            "Type" = "3:8"
                            "ContextData" = "8:Bitmap"
                            "Attributes" = "3:4"
                            "Setting" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                        }
                    }
                }
            }
            "{DF760B10-853B-4699-99F2-AFF7185B4A62}:_F50BFFAAF7934C7C9D0F498D45BEAC59"
            {
            "Name" = "8:#1901"
            "Sequence" = "3:1"
            "Attributes" = "3:2"
                "Dialogs"
                {
                    "{688940B3-5CA9-4162-8DEE-2993FA9D8CBC}:_28EDD8B74B4C48E0986AB18B15373BA8"
                    {
                    "Sequence" = "3:100"
                    "DisplayName" = "8:進行状況"
                    "UseDynamicProperties" = "11:TRUE"
                    "IsDependency" = "11:FALSE"
                    "SourcePath" = "8:<VsdDialogDir>\\VsdProgressDlg.wid"
                        "Properties"
                        {
                            "BannerBitmap"
                            {
                            "Name" = "8:BannerBitmap"
                            "DisplayName" = "8:#1001"
                            "Description" = "8:#1101"
                            "Type" = "3:8"
                            "ContextData" = "8:Bitmap"
                            "Attributes" = "3:4"
                            "Setting" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                            "ShowProgress"
                            {
                            "Name" = "8:ShowProgress"
                            "DisplayName" = "8:#1009"
                            "Description" = "8:#1109"
                            "Type" = "3:5"
                            "ContextData" = "8:1;True=1;False=0"
                            "Attributes" = "3:0"
                            "Setting" = "3:0"
                            "Value" = "3:1"
                            "DefaultValue" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                        }
                    }
                }
            }
            "{DF760B10-853B-4699-99F2-AFF7185B4A62}:_F52435F4C1A74C6AB8AD039F09AE513F"
            {
            "Name" = "8:#1902"
            "Sequence" = "3:2"
            "Attributes" = "3:3"
                "Dialogs"
                {
                    "{688940B3-5CA9-4162-8DEE-2993FA9D8CBC}:_B6E148CEF3DD4646B243E69C5D49B372"
                    {
                    "Sequence" = "3:100"
                    "DisplayName" = "8:完了"
                    "UseDynamicProperties" = "11:TRUE"
                    "IsDependency" = "11:FALSE"
                    "SourcePath" = "8:<VsdDialogDir>\\VsdAdminFinishedDlg.wid"
                        "Properties"
                        {
                            "BannerBitmap"
                            {
                            "Name" = "8:BannerBitmap"
                            "DisplayName" = "8:#1001"
                            "Description" = "8:#1101"
                            "Type" = "3:8"
                            "ContextData" = "8:Bitmap"
                            "Attributes" = "3:4"
                            "Setting" = "3:1"
                            "UsePlugInResources" = "11:TRUE"
                            }
                        }
                    }
                }
            }
        }
        "MergeModule"
        {
        }
        "ProjectOutput"
        {
            "{5259A561-127C-4D43-A0A1-72F10C7B3BF8}:_7F13BF72DA334A529C90E04C0F1B1A7D"
            {
            "SourcePath" = "8:x64\\Release\\dll\\HelloWorld.dll"
            "TargetName" = "8:"
            "Tag" = "8:"
            "Folder" = "8:_7FCF70061CEB4EA6A409F9FB7FC9687E"
            "Condition" = "8:"
            "Transitive" = "11:FALSE"
            "Vital" = "11:TRUE"
            "ReadOnly" = "11:FALSE"
            "Hidden" = "11:FALSE"
            "System" = "11:FALSE"
            "Permanent" = "11:FALSE"
            "SharedLegacy" = "11:FALSE"
            "PackageAs" = "3:1"
            "Register" = "3:1"
            "Exclude" = "11:FALSE"
            "IsDependency" = "11:FALSE"
            "IsolateTo" = "8:"
            "ProjectOutputGroupRegister" = "3:1"
            "OutputConfiguration" = "8:Release|x64"
            "OutputGroupCanonicalName" = "8:Built"
            "OutputProjectGuid" = "8:{491DC6E6-840C-4693-B523-B499A0320C3A}"
            "ShowKeyOutput" = "11:TRUE"
                "ExcludeFilters"
                {
                }
            }
        }
    }
}
````

## File: HelloWorld/Source.cpp
````cpp
#if MAC
#define unused(a) (void*) a ;
#else
void* unused(void* x) { return x; };
#endif


#include "./include/SoSharedLibDefs.h"
#include "include/SoCClient.h"
#include "samplelib.h"
#include <corecrt_malloc.h>
#include <vcruntime_string.h>
#include <string.h>



SoObjectInterface* gpObjectInterface = NULL;
SoServerInterface* gpServer = NULL;
SoHServer          ghServer = NULL;
int                ME = 0;



struct myData_s {
    char* additionalDllPath;
    int   me;
};
typedef struct myData_s  myData_t;
typedef        myData_t* myData_p;



ESerror_t objectInitialize(SoHObject hObject, int argc, TaggedData* argv) {

    myData_p pMyData = (myData_p)malloc(sizeof(myData_t));
    memset(pMyData, 0, sizeof(myData_t));
    pMyData->me = ++ME;


    SoCClientName Methods[] = {
        { "useAdditionalDll", 0, NULL },
        { "newMethod", 0, NULL },
        { NULL }
    };



    if (argc > 0 && argv[0].type == kTypeString) {
        pMyData->additionalDllPath = strdup(argv[0].data.string);
    }


    gpServer->setClientData(hObject, pMyData);
    gpServer->addMethods(hObject, Methods);

    return kESErrOK;
}



ESerror_t objectCall(SoHObject hObject, SoCClientName* name, int argc, TaggedData* argv, TaggedData* pResult) {

    myData_p pMyData;
    gpServer->getClientData(hObject, (void**)&pMyData);









    if (strcmp(name->name_sig, "useAdditionalDll") == 0) {
        pResult->type = kTypeString;
        pResult->data.string = strdup("Method useAdditionalDll called.");
    }
    else if (strcmp(name->name_sig, "newMethod") == 0) {
        pResult->type = kTypeString;
        pResult->data.string = strdup("New method called.");
    }
    else {

		return kESErrNotImplemented;
	}

    return kESErrOK;
}











ESerror_t objectGet(SoHObject hObject, SoCClientName* name, TaggedData* pResult) {


    if (strcmp(name->name_sig, "someProperty") == 0) {
        pResult->type = kTypeString;
        pResult->data.string = strdup("This is someProperty");
    }
    else {
        return kESErrNotImplemented;
    }
    return kESErrOK;
}










ESerror_t objectPut(SoHObject hObject, SoCClientName* name, TaggedData* pValue) {


    if (strcmp(name->name_sig, "someProperty") == 0) {


    }
    else {
        return kESErrNotImplemented;
    }
    return kESErrOK;
}







ESerror_t objectValueOf(SoHObject hObject, TaggedData* pResult) {

    pResult->type = kTypeString;
    pResult->data.string = strdup("valueOf: This is the value");
    return kESErrOK;
}







ESerror_t objectToString(SoHObject hObject, TaggedData* pResult) {

    pResult->type = kTypeString;
    pResult->data.string = strdup("toString: This is the object");
    return kESErrOK;
}



ESerror_t objectFinalize(SoHObject hObject) {

    myData_p pMyData;
    gpServer->getClientData(hObject, (void**)&pMyData);


    if (pMyData) {
        if (pMyData->additionalDllPath) free(pMyData->additionalDllPath);
        free(pMyData);
    }
    return kESErrOK;
}



SoObjectInterface objectInterface = {
    objectInitialize,
    NULL,
    NULL,
    objectCall,
    NULL,
    NULL,
    objectFinalize
};



extern "C" SAMPLIB int ESClientInterface(SoCClient_e kReason, SoServerInterface * pServer, SoHServer hServer) {

    if (!gpObjectInterface) {
        gpObjectInterface = &objectInterface;
    }


    ghServer = hServer;


    switch (kReason) {
    case kSoCClient_init: {

        gpServer = pServer;


        gpServer->addClass(hServer, "MyExternalObject", &objectInterface);
        return 0;
    }
    case kSoCClient_term: {

        ME = 0;
        return 0;
    }
    }
    return 0;
}
````

## File: HelloWorld/UpgradeLog.htm
````html
<!DOCTYPE html>
<!-- saved from url=(0014)about:internet -->
 <html xmlns:msxsl="urn:schemas-microsoft-com:xslt"><head><meta content="en-us" http-equiv="Content-Language" /><meta content="text/html; charset=utf-16" http-equiv="Content-Type" /><title _locID="ConversionReport0">
          Migration Report
        </title><style> 
                    /* Body style, for the entire document */
                    body
                    {
                        background: #F3F3F4;
                        color: #1E1E1F;
                        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                        padding: 0;
                        margin: 0;
                    }

                    /* Header1 style, used for the main title */
                    h1
                    {
                        padding: 10px 0px 10px 10px;
                        font-size: 21pt;
                        background-color: #E2E2E2;
                        border-bottom: 1px #C1C1C2 solid; 
                        color: #201F20;
                        margin: 0;
                        font-weight: normal;
                    }

                    /* Header2 style, used for "Overview" and other sections */
                    h2
                    {
                        font-size: 18pt;
                        font-weight: normal;
                        padding: 15px 0 5px 0;
                        margin: 0;
                    }

                    /* Header3 style, used for sub-sections, such as project name */
                    h3
                    {
                        font-weight: normal;
                        font-size: 15pt;
                        margin: 0;
                        padding: 15px 0 5px 0;
                        background-color: transparent;
                    }

                    /* Color all hyperlinks one color */
                    a
                    {
                        color: #1382CE;
                    }

                    /* Table styles */ 
                    table
                    {
                        border-spacing: 0 0;
                        border-collapse: collapse;
                        font-size: 10pt;
                    }

                    table th
                    {
                        background: #E7E7E8;
                        text-align: left;
                        text-decoration: none;
                        font-weight: normal;
                        padding: 3px 6px 3px 6px;
                    }

                    table td
                    {
                        vertical-align: top;
                        padding: 3px 6px 5px 5px;
                        margin: 0px;
                        border: 1px solid #E7E7E8;
                        background: #F7F7F8;
                    }

                    /* Local link is a style for hyperlinks that link to file:/// content, there are lots so color them as 'normal' text until the user mouse overs */
                    .localLink
                    {
                        color: #1E1E1F;
                        background: #EEEEED;
                        text-decoration: none;
                    }

                    .localLink:hover
                    {
                        color: #1382CE;
                        background: #FFFF99;
                        text-decoration: none;
                    }

                    /* Center text, used in the over views cells that contain message level counts */ 
                    .textCentered
                    {
                        text-align: center;
                    }

                    /* The message cells in message tables should take up all avaliable space */
                    .messageCell
                    {
                        width: 100%;
                    }

                    /* Padding around the content after the h1 */ 
                    #content 
                    {
	                    padding: 0px 12px 12px 12px; 
                    }

                    /* The overview table expands to width, with a max width of 97% */ 
                    #overview table
                    {
                        width: auto;
                        max-width: 75%; 
                    }

                    /* The messages tables are always 97% width */
                    #messages table
                    {
                        width: 97%;
                    }

                    /* All Icons */
                    .IconSuccessEncoded, .IconInfoEncoded, .IconWarningEncoded, .IconErrorEncoded
                    {
                        min-width:18px;
                        min-height:18px; 
                        background-repeat:no-repeat;
                        background-position:center;
                    }

                    /* Success icon encoded */
                    .IconSuccessEncoded
                    {
                        /* Note: Do not delete the comment below. It is used to verify the correctness of the encoded image resource below before the product is released */
                        /* [---XsltValidateInternal-Base64EncodedImage:IconSuccess#Begin#background-image: url(data:image/png;base64,#Separator#);#End#] */
                        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABcElEQVR4Xq2TsUsCURzHv15g8ZJcBWlyiYYgCIWcb9DFRRwMW5TA2c0/QEFwFkxxUQdxVlBwCYWOi6IhWgQhBLHJUCkhLr/BW8S7gvrAg+N+v8/v+x68Z8MGy+XSCyABQAXgBgHGALoASkIIDWSLeLBetdHryMjd5IxQPWT4rn1c/P7+xxp72Cs9m5SZ0Bq2vPnbPFafK2zDvmNHypdC0BPkLlQhxJsCAhQoZwdZU5mwxh720qGo8MzTxTTKZDPCx2HoVzp6lz0Q9tKhyx0kGs8Ny+TkWRKk8lCROwEduhyg9l/6lunOPSfmH3NUH6uQ0KHLAe7JYvJjevm+DAMGJHToKtigE+vwvIidxLamb8IBY9e+C5LiXREkfho3TSd06HJA13/oh6T51MTsfQbHrsMynQ5dDihFjiK8JJAU9AKIWTp76dCVN7HWHrajmUEGvyF9nkbAE6gLIS7kTUyuf2gscLoJrElZo/Mvj+nPz/kLTmfnEwP3tB0AAAAASUVORK5CYII=);
                    }

                    /* Information icon encoded */
                    .IconInfoEncoded
                    {
                        /* Note: Do not delete the comment below. It is used to verify the correctness of the encoded image resource below before the product is released */
                        /* [---XsltValidateInternal-Base64EncodedImage:IconInformation#Begin#background-image: url(data:image/png;base64,#Separator#);#End#] */
                        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHElEQVR4Xs2TsUoDQRRF7wwoziokjZUKadInhdhukR9YP8DMX1hYW+QvdsXa/QHBbcXC7W0CamWTQnclFutceIQJwwaWNLlwm5k5d94M76mmaeCrrmsLYOocY12FcxZFUeozCqKqqgYA8uevv1H6VuPxcwlfk5N92KHBxfFeCSAxxswlYAW/Xr989x/mv9gkhtyMDhcAxgzRsp7flj8B/HF1RsMXq+NZMkopaHe7lbKxQUEIGbKsYNoGn969060hZBkQex/W8oRQwsQaW2o3Ago2SVcJUzAgY3N0lTCZZm+zPS8HB51gMmS1DEYyOz9acKO1D8JWTlafKIMxdhvlfdyT94Vv5h7P8Ky7nQzACmhvKq3zk3PjW9asz9D/1oigecsioooAAAAASUVORK5CYII=);
                    }

                    /* Warning icon encoded */
                    .IconWarningEncoded
                    {
                        /* Note: Do not delete the comment below. It is used to verify the correctness of the encoded image resource below before the product is released */
                        /* [---XsltValidateInternal-Base64EncodedImage:IconWarning#Begin#background-image: url(data:image/png;base64,#Separator#);#End#] */
                        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAx0lEQVR4XpWSMQ7CMAxFf4xAyBMLCxMrO8dhaBcuwdCJS3RJBw7SA/QGTCxdWJgiQYWKXJWKIXHIlyw5lqr34tQgEOdcBsCOx5yZK3hCCKdYXneQkh4pEfqzLfu+wVDSyyzFoJjfz9NB+pAF+eizx2Vruts0k15mPgvS6GYvpVtQhB61IB/dk6AF6fS4Ben0uIX5odtFe8Q/eW1KvFeH4e8khT6+gm5B+t3juyDt7n0jpe+CANTd+oTUjN/U3yVaABnSUjFz/gFq44JaVSCXeQAAAABJRU5ErkJggg==);
                    }

                    /* Error icon encoded */
                    .IconErrorEncoded
                    {
                        /* Note: Do not delete the comment below. It is used to verify the correctness of the encoded image resource below before the product is released */
                        /* [---XsltValidateInternal-Base64EncodedImage:IconError#Begin#background-image: url(data:image/png;base64,#Separator#);#End#] */
                        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABQElEQVR4XqWTvUoEQRCE6wYPZUA80AfwAQz23uCMjA7MDRQEIzPBVEyNTQUFIw00vcQTTMzuAh/AxEQQT8HF/3G/oGGnEUGuoNnd6qoZuqltyKEsyzVJq5I6rnUp6SjGeGhESikzzlc1eL7opfuVbrqbU1Zw9NCgtQMaZpY0eNnaaL2fHusvTK5vKu7sjSS1Y4y3QUA6K3e3Mau5UFDyMP7tYF9o8cAHZv68vipoIJg971PZIZ5HiwdvYGGvFVFHmGmZ2MxwmQYPXubPl9Up0tfoMQGetXd6mRbvhBw+boZ6WF7Mbv1+GsHRk0fQmPAH1GfmZirbCfDJ61tw3Px8/8pZsPAG4jlVhcPgZ7adwNWBB68lkRQWFiTgFlbnLY3DGGM7izIJIyT/jjIvEJw6fdJTc6krDzh6aMwMP9bvDH4ADSsa9uSWVJkAAAAASUVORK5CYII=);
                    }
                 </style><script type="text/javascript" language="javascript"> 
          
            // Startup 
            // Hook up the the loaded event for the document/window, to linkify the document content
            var startupFunction = function() { linkifyElement("messages"); };
            
            if(window.attachEvent)
            {
              window.attachEvent('onload', startupFunction);
            }
            else if (window.addEventListener) 
            {
              window.addEventListener('load', startupFunction, false);
            }
            else 
            {
              document.addEventListener('load', startupFunction, false);
            } 
            
            // Toggles the visibility of table rows with the specified name 
            function toggleTableRowsByName(name)
            {
               var allRows = document.getElementsByTagName('tr');
               for (i=0; i < allRows.length; i++)
               {
                  var currentName = allRows[i].getAttribute('name');
                  if(!!currentName && currentName.indexOf(name) == 0)
                  {
                      var isVisible = allRows[i].style.display == ''; 
                      isVisible ? allRows[i].style.display = 'none' : allRows[i].style.display = '';
                  }
               }
            }
            
            function scrollToFirstVisibleRow(name) 
            {
               var allRows = document.getElementsByTagName('tr');
               for (i=0; i < allRows.length; i++)
               {
                  var currentName = allRows[i].getAttribute('name');
                  var isVisible = allRows[i].style.display == ''; 
                  if(!!currentName && currentName.indexOf(name) == 0 && isVisible)
                  {
                     allRows[i].scrollIntoView(true); 
                     return true; 
                  }
               }
               
               return false;
            }
            
            // Linkifies the specified text content, replaces candidate links with html links 
            function linkify(text)
            {
                 if(!text || 0 === text.length)
                 {
                     return text; 
                 }

                 // Find http, https and ftp links and replace them with hyper links 
                 var urlLink = /(http|https|ftp)\:\/\/[a-zA-Z0-9\-\.]+(:[a-zA-Z0-9]*)?\/?([a-zA-Z0-9\-\._\?\,\/\\\+&%\$#\=~;\{\}])*/gi;
                 
                 return text.replace(urlLink, '<a href="$&">$&</a>') ;
            }
            
            // Linkifies the specified element by ID
            function linkifyElement(id)
            {
                var element = document.getElementById(id);
                if(!!element)
                {
                  element.innerHTML = linkify(element.innerHTML); 
                }
            }
            
            function ToggleMessageVisibility(projectName)
            {
              if(!projectName || 0 === projectName.length)
              {
                return; 
              }
              
              toggleTableRowsByName("MessageRowClass" + projectName);
              toggleTableRowsByName('MessageRowHeaderShow' + projectName);
              toggleTableRowsByName('MessageRowHeaderHide' + projectName); 
            }
            
            function ScrollToFirstVisibleMessage(projectName)
            {
              if(!projectName || 0 === projectName.length)
              {
                return; 
              }
              
              // First try the 'Show messages' row
              if(!scrollToFirstVisibleRow('MessageRowHeaderShow' + projectName))
              {
                // Failed to find a visible row for 'Show messages', try an actual message row 
                scrollToFirstVisibleRow('MessageRowClass' + projectName); 
              }
            }
           </script></head><body><h1 _locID="ConversionReport">
          Migration Report - </h1><div id="content"><h2 _locID="OverviewTitle">Overview</h2><div id="overview"><table><tr><th></th><th _locID="ProjectTableHeader">Project</th><th _locID="PathTableHeader">Path</th><th _locID="ErrorsTableHeader">Errors</th><th _locID="WarningsTableHeader">Warnings</th><th _locID="MessagesTableHeader">Messages</th></tr><tr><td class="IconErrorEncoded" /><td><strong><a href="#Setup_HelloWorld">Setup_HelloWorld</a></strong></td><td>Setup_HelloWorld.vdproj</td><td class="textCentered"><a href="#Setup_HelloWorldError">1</a></td><td class="textCentered"><a>0</a></td><td class="textCentered"><a href="#">0</a></td></tr><tr><td class="IconSuccessEncoded" /><td><strong><a href="#HelloWorld">HelloWorld</a></strong></td><td>HelloWorld.vcxproj</td><td class="textCentered"><a>0</a></td><td class="textCentered"><a>0</a></td><td class="textCentered"><a href="#">0</a></td></tr><tr><td class="IconSuccessEncoded" /><td><strong><a href="#Solution"><span _locID="OverviewSolutionSpan">Solution</span></a></strong></td><td>HelloWorld.sln</td><td class="textCentered"><a>0</a></td><td class="textCentered"><a>0</a></td><td class="textCentered"><a href="#" onclick="ScrollToFirstVisibleMessage('Solution'); return false;">1</a></td></tr></table></div><h2 _locID="SolutionAndProjectsTitle">Solution and projects</h2><div id="messages"><a name="Setup_HelloWorld" /><h3>Setup_HelloWorld</h3><table><tr id="Setup_HelloWorldHeaderRow"><th></th><th class="messageCell" _locID="MessageTableHeader">Message</th></tr><tr name="ErrorRowClassSetup_HelloWorld"><td class="IconErrorEncoded"><a name="Setup_HelloWorldError" /></td><td class="messageCell"><strong>Setup_HelloWorld.vdproj:
        </strong><span>The application which this project type is based on was not found. Please try this link for further information: 54435603-dbb4-11d2-8724-00a0c9a8b90c</span></td></tr></table><a name="HelloWorld" /><h3>HelloWorld</h3><table><tr id="HelloWorldHeaderRow"><th></th><th class="messageCell" _locID="MessageTableHeader">Message</th></tr><tr><td class="IconInfoEncoded" /><td class="messageCell" _locID="NoMessagesRow">HelloWorld logged no messages.
                  </td></tr></table><a name="Solution" /><h3 _locID="ProjectDisplayNameHeader">Solution</h3><table><tr id="SolutionHeaderRow"><th></th><th class="messageCell" _locID="MessageTableHeader">Message</th></tr><tr name="MessageRowHeaderShowSolution"><td class="IconInfoEncoded" /><td class="messageCell"><a _locID="ShowAdditionalMessages" href="#" name="SolutionMessage" onclick="ToggleMessageVisibility('Solution'); return false;">
          Show 1 additional messages
        </a></td></tr><tr name="MessageRowClassSolution" style="display: none"><td class="IconInfoEncoded"><a name="SolutionMessage" /></td><td class="messageCell"><strong>HelloWorld.sln:
        </strong><span>The solution file does not require migration.</span></td></tr><tr style="display: none" name="MessageRowHeaderHideSolution"><td class="IconInfoEncoded" /><td class="messageCell"><a _locID="HideAdditionalMessages" href="#" name="SolutionMessage" onclick="ToggleMessageVisibility('Solution'); return false;">
          Hide 1 additional messages
        </a></td></tr></table></div></div></body></html>
````

## File: plugplugdump.txt
````
Dump of file PlugPlug.dll

File Type: DLL

  Section contains the following exports for PlugPlug.dll

    00000000 characteristics
    FFFFFFFF time date stamp
        0.00 version
           1 ordinal base
          41 number of functions
          41 number of names

    ordinal hint RVA      name

          1    0 000CB770 AddEventListener
          2    1 000CB780 DispatchEvent
          3    2 000CB790 LoadExtension
          4    3 000CB7A0 LoadExtensionEx
          5    4 000C5FF0 PlugPlugAddEventListener
          6    5 000C6240 PlugPlugCollectRecentLogs
          7    6 000C63C0 PlugPlugDispatchEvent
          8    7 000C6580 PlugPlugDumpInstallationInfo
          9    8 000C6620 PlugPlugExtensionCall
         10    9 000C6630 PlugPlugFlyoutMenuClosed
         11    A 000C6690 PlugPlugFlyoutMenuOpened
         12    B 000C66F0 PlugPlugGetJobs
         13    C 000C6790 PlugPlugGetVersion
         14    D 000C67F0 PlugPlugIMSAttemptSSOJumpWorkflows
         15    E 000C6A20 PlugPlugIMSConnect
         16    F 000C6B40 PlugPlugIMSConnectWithEndpoint
         17   10 000C6C90 PlugPlugIMSDisconnect
         18   11 000C6DB0 PlugPlugIMSFetchAccessToken
         19   12 000C6F30 PlugPlugIMSFetchAccessTokenWithStatus
         20   13 000C70B0 PlugPlugIMSFetchAccounts
         21   14 000C71E0 PlugPlugIMSFetchContinueToken
         22   15 000C7380 PlugPlugIMSFetchUserProfileData
         23   16 000C74B0 PlugPlugIMSLogoutUser
         24   17 000C75F0 PlugPlugIMSSetProxyCredentials
         25   18 000C7720 PlugPlugLoadExtension
         26   19 000C7A80 PlugPlugLoadExtensionEx
         27   1A 000C7DF0 PlugPlugMenuCall
         28   1B 000C83D0 PlugPlugNotifyStateChange
         29   1C 000C8D80 PlugPlugPurgeJobs
         30   1D 000C8E20 PlugPlugRemoveEventListener
         31   1E 000C8FE0 PlugPlugRequestUrl
         32   1F 000C6620 PlugPlugSetFlashPanelList
         33   20 000C8FF0 PlugPlugSetHtmlPanelList
         34   21 000C94D0 PlugPlugSetNglProfileData
         35   22 000C9890 PlugPlugSetScaleFactor
         36   23 000C9960 PlugPlugSetup
         37   24 000C9BC0 PlugPlugShowAAM
         38   25 000C9D30 PlugPlugTerminate
         39   26 000CA020 PlugPlugUnloadExtension
         40   27 000CB7B0 RemoveEventListener
         41   28 000CB7C0 UnloadExtension
````

## File: README.md
````markdown
# AE-SDK-CEP-UTILS
A collection of various articles, projects, and my own work that demonstrates various sparsely documented features of both c++ plugins and CEP extensions for AE

## Extendscript ExternalObject

- [Hello World Example by Bryful](https://github.com/bryful/HelloWorld)
   - Simple ExternalObject Setup. Serves as a good "Skeleton"

- [FS Utils by Bryful](https://github.com/bryful/FsUtils)
  
- [This Article](https://qiita.com/MAA_/items/b1a35ab73af9f7b327e0)

## Misc

- [Misc AE Utils](https://github.com/bryful/AE_utils)


The files included in this repo currently demonstrate how to use the PlugPlug.Dll from the c++ side in order to send and receive csxs events. 
You can actually use the CSXS wrappers for any adobe app, provided you find a way to get the path to PlugPlug.Dll in your app.

You would then make sure the event listener is loaded whenever your plugin is initialized. 

So you'd want to include this;

https://github.com/Trentonom0r3/AE-SDK-CEP-UTILS/blob/main/AEGP/Grabba/Win/CSXSUtils.h

Make sure you add this to your project;

https://github.com/Trentonom0r3/AE-SDK-CEP-UTILS/blob/main/AEGP/Grabba/CSXUtils.cpp

and then the only other thing you would have to adjust would be this function in CSXUtils.cpp, basically just tell it what you want to listen for and what you want it to do when you hear it. It would also be a really good idea to add a condition to ignore whatever you're sending from the plugin itself, otherwise it'll get stuck in an infinite loop.

	
	void MyEventListener(const Event* const event, void* const context) {
	    std::cout << "Received event: " << event->type << std::endl;
	
	    if (event->data) {
	        if (strcmp(event->data, "Hello from JSX!") == 0) {
	            std::cout << "Event data is correct." << std::endl;
	            int res = SendEvent("com.adobe.csxs.events.MyCustomEvent", "AEFT", "getimg", "Hello from C++");
	            if (res == kEventErrorCode_Success) {
	                std::cout << "Event sent successfully." << std::endl;
	            }
	            else {
	                std::cerr << "Failed to send event." << std::endl;
	            }
	        }
	        else {
	            std::cerr << "Event data is incorrect." << std::endl;
	        }
	
	    }
	}
	

I would make a wrapper around it in your main code, and return the strings from the event listener so you don't have to worry about including SDK headers or anything.
Finally, you can create an event listener in your main code like this;

	
	char* RegisterEvent(const char* EventType)
	{
		std::string path;
		path = GetPlugPlugPath();
	
		LoadDLL(path);
	
		int result = RegisterEventListener(EventType);
	
		if (result == 1) {
			return "Success";
		}
		else {
			return "Error";
		}
	}
````
