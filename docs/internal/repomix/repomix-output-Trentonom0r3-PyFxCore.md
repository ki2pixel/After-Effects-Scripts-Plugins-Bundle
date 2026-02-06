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
x64/
  Debug/
    PyFxCore.dll
    PyFxCore.exp
    PyFxCore.lib
  Release/
    PyFxCore.dll
    PyFxCore.exp
    PyFxCore.lib
dllmain.cpp
framework.h
pch.cpp
pch.h
PyFxCore.sln
PyFxCore.vcxproj
PyFxCore.vcxproj.filters
PyFxCore.vcxproj.user
README.md
```

# Files

## File: dllmain.cpp
```cpp
#include "pch.h"
#include <Python.h>
#define Py_LIMITED_API 0x03060000
#include <pybind11/pybind11.h>
#include <pybind11/embed.h>
#include <atomic>
#include <thread>
#include <iostream>

namespace py = pybind11;
static std::atomic<bool> isRunning(false);
std::thread interpreterThread;

BOOL APIENTRY DllMain(HMODULE hModule, DWORD ul_reason_for_call, LPVOID lpReserved)
{
    switch (ul_reason_for_call)
    {
    case DLL_PROCESS_ATTACH:
        if (!isRunning.exchange(true)) {
            interpreterThread = std::thread([]() {
                py::initialize_interpreter();

                while (isRunning.load()) {
                    py::gil_scoped_release release;
                    std::this_thread::sleep_for(std::chrono::seconds(1));
                }

                py::finalize_interpreter();
                });
        }
        break;
    case DLL_THREAD_ATTACH:
    case DLL_THREAD_DETACH:

        break;
    case DLL_PROCESS_DETACH:
        isRunning = false;
        if (interpreterThread.joinable()) {
            interpreterThread.join();
        }
        break;
    }
    return TRUE;
}
```

## File: framework.h
```c
#pragma once

#define WIN32_LEAN_AND_MEAN

#include <windows.h>
#include <thread>
#include <iostream>
```

## File: pch.cpp
```cpp
#include "pch.h"



void pyfx_init()
{
}
```

## File: pch.h
```c
#ifndef PCH_H
#define PCH_H


#include "framework.h"
#ifdef PYFXLIB_EXPORTS
#define PYFXAPI __declspec(dllexport)
#else
#define PYFXAPI __declspec(dllimport)
#endif

PYFXAPI void pyfx_init();

#endif
```

## File: PyFxCore.sln
```
Microsoft Visual Studio Solution File, Format Version 12.00
# Visual Studio Version 17
VisualStudioVersion = 17.6.33801.468
MinimumVisualStudioVersion = 10.0.40219.1
Project("{8BC9CEB8-8B4A-11D0-8D11-00A0C91BC942}") = "PyFxCore", "PyFxCore.vcxproj", "{77AA0B2B-40FD-4D61-AC61-42636A2F023E}"
EndProject
Global
	GlobalSection(SolutionConfigurationPlatforms) = preSolution
		Debug|x64 = Debug|x64
		Debug|x86 = Debug|x86
		Release|x64 = Release|x64
		Release|x86 = Release|x86
	EndGlobalSection
	GlobalSection(ProjectConfigurationPlatforms) = postSolution
		{77AA0B2B-40FD-4D61-AC61-42636A2F023E}.Debug|x64.ActiveCfg = Debug|x64
		{77AA0B2B-40FD-4D61-AC61-42636A2F023E}.Debug|x64.Build.0 = Debug|x64
		{77AA0B2B-40FD-4D61-AC61-42636A2F023E}.Debug|x86.ActiveCfg = Debug|Win32
		{77AA0B2B-40FD-4D61-AC61-42636A2F023E}.Debug|x86.Build.0 = Debug|Win32
		{77AA0B2B-40FD-4D61-AC61-42636A2F023E}.Release|x64.ActiveCfg = Release|x64
		{77AA0B2B-40FD-4D61-AC61-42636A2F023E}.Release|x64.Build.0 = Release|x64
		{77AA0B2B-40FD-4D61-AC61-42636A2F023E}.Release|x86.ActiveCfg = Release|Win32
		{77AA0B2B-40FD-4D61-AC61-42636A2F023E}.Release|x86.Build.0 = Release|Win32
	EndGlobalSection
	GlobalSection(SolutionProperties) = preSolution
		HideSolutionNode = FALSE
	EndGlobalSection
	GlobalSection(ExtensibilityGlobals) = postSolution
		SolutionGuid = {AEAE5FA5-8ACB-4DF7-8E3E-875DA3EFEF40}
	EndGlobalSection
EndGlobal
```

## File: PyFxCore.vcxproj
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
    <ProjectGuid>{77aa0b2b-40fd-4d61-ac61-42636a2f023e}</ProjectGuid>
    <RootNamespace>PyFxCore</RootNamespace>
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
    <TargetName>PyFxCore</TargetName>
    <IncludePath>$(Path)Include;$(IncludePath)</IncludePath>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">
    <TargetName>PyFxCore</TargetName>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">
    <TargetName>PyFxCore</TargetName>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <TargetName>PyFxCore</TargetName>
    <IncludePath>$(Path)Include;$(IncludePath)</IncludePath>
  </PropertyGroup>
  <PropertyGroup Label="Vcpkg" Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">
    <VcpkgInstalledDir>..\..\..\vcpkg\installed</VcpkgInstalledDir>
    <VcpkgUseStatic>true</VcpkgUseStatic>
    <VcpkgConfiguration>Debug</VcpkgConfiguration>
  </PropertyGroup>
  <PropertyGroup Label="Vcpkg" Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <VcpkgInstalledDir>..\..\..\vcpkg\installed</VcpkgInstalledDir>
    <VcpkgUseStatic>true</VcpkgUseStatic>
  </PropertyGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">
    <ClCompile>
      <WarningLevel>Level3</WarningLevel>
      <SDLCheck>true</SDLCheck>
      <PreprocessorDefinitions>WIN32;_DEBUG;PYFXCORE_EXPORTS;_WINDOWS;_USRDLL;%(PreprocessorDefinitions)</PreprocessorDefinitions>
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
      <PreprocessorDefinitions>WIN32;NDEBUG;PYFXCORE_EXPORTS;_WINDOWS;_USRDLL;%(PreprocessorDefinitions)</PreprocessorDefinitions>
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
      <WarningLevel>Level3</WarningLevel>
      <SDLCheck>true</SDLCheck>
      <PreprocessorDefinitions>_DEBUG;PYFXLIB_EXPORTS;_WINDOWS;_USRDLL;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <ConformanceMode>true</ConformanceMode>
      <PrecompiledHeader>Use</PrecompiledHeader>
      <PrecompiledHeaderFile>pch.h</PrecompiledHeaderFile>
      <AdditionalIncludeDirectories>C:\Program Files\Python312\include;%(AdditionalIncludeDirectories)</AdditionalIncludeDirectories>
      <RuntimeLibrary>MultiThreadedDebug</RuntimeLibrary>
      <LanguageStandard>stdcpp17</LanguageStandard>
    </ClCompile>
    <Link>
      <SubSystem>Windows</SubSystem>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <EnableUAC>false</EnableUAC>
      <AdditionalLibraryDirectories>C:\Program Files\Python312\libs;%(AdditionalLibraryDirectories)</AdditionalLibraryDirectories>
      <AdditionalDependencies>"C:\Program Files\Python312\libs\python3_d.lib";"C:\Program Files\Python312\libs\python312_d.lib";%(AdditionalDependencies)</AdditionalDependencies>
    </Link>
  </ItemDefinitionGroup>
  <ItemDefinitionGroup Condition="'$(Configuration)|$(Platform)'=='Release|x64'">
    <ClCompile>
      <WarningLevel>Level3</WarningLevel>
      <FunctionLevelLinking>true</FunctionLevelLinking>
      <IntrinsicFunctions>true</IntrinsicFunctions>
      <SDLCheck>true</SDLCheck>
      <PreprocessorDefinitions>NDEBUG;PYFXLIB_EXPORTS;_WINDOWS;_USRDLL;%(PreprocessorDefinitions)</PreprocessorDefinitions>
      <ConformanceMode>true</ConformanceMode>
      <PrecompiledHeader>Use</PrecompiledHeader>
      <PrecompiledHeaderFile>pch.h</PrecompiledHeaderFile>
      <AdditionalIncludeDirectories>C:\Program Files\Python312\include</AdditionalIncludeDirectories>
      <RuntimeLibrary>MultiThreaded</RuntimeLibrary>
    </ClCompile>
    <Link>
      <SubSystem>Windows</SubSystem>
      <EnableCOMDATFolding>true</EnableCOMDATFolding>
      <OptimizeReferences>true</OptimizeReferences>
      <GenerateDebugInformation>true</GenerateDebugInformation>
      <EnableUAC>false</EnableUAC>
      <AdditionalDependencies>"C:\Program Files\Python312\libs\python3.lib";"C:\Program Files\Python312\libs\python312.lib";%(AdditionalDependencies)</AdditionalDependencies>
    </Link>
  </ItemDefinitionGroup>
  <ItemGroup>
    <None Include="cpp.hint" />
  </ItemGroup>
  <ItemGroup>
    <ClInclude Include="framework.h" />
    <ClInclude Include="pch.h" />
  </ItemGroup>
  <ItemGroup>
    <ClCompile Include="dllmain.cpp" />
    <ClCompile Include="pch.cpp">
      <PrecompiledHeader Condition="'$(Configuration)|$(Platform)'=='Debug|x64'">Create</PrecompiledHeader>
      <PrecompiledHeader Condition="'$(Configuration)|$(Platform)'=='Debug|Win32'">Create</PrecompiledHeader>
      <PrecompiledHeader Condition="'$(Configuration)|$(Platform)'=='Release|Win32'">Create</PrecompiledHeader>
      <PrecompiledHeader Condition="'$(Configuration)|$(Platform)'=='Release|x64'">Create</PrecompiledHeader>
    </ClCompile>
  </ItemGroup>
  <Import Project="$(VCTargetsPath)\Microsoft.Cpp.targets" />
  <ImportGroup Label="ExtensionTargets">
  </ImportGroup>
</Project>
```

## File: PyFxCore.vcxproj.filters
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
    <None Include="cpp.hint" />
  </ItemGroup>
  <ItemGroup>
    <ClInclude Include="framework.h">
      <Filter>Header Files</Filter>
    </ClInclude>
    <ClInclude Include="pch.h">
      <Filter>Header Files</Filter>
    </ClInclude>
  </ItemGroup>
  <ItemGroup>
    <ClCompile Include="dllmain.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
    <ClCompile Include="pch.cpp">
      <Filter>Source Files</Filter>
    </ClCompile>
  </ItemGroup>
</Project>
```

## File: PyFxCore.vcxproj.user
```
<?xml version="1.0" encoding="utf-8"?>
<Project ToolsVersion="Current" xmlns="http://schemas.microsoft.com/developer/msbuild/2003">
  <PropertyGroup />
</Project>
```

## File: README.md
```markdown
# PyFxCore
Dll that aims to serve as a standardized python entry point for After Effects Applications, enabling proper interaction with AME.

# Dependencies
- Pybind11 [x64-windows-static]
- Python 3.6 minimum. I've linked to python 3.12, but you can link to whatever version, just change the VS files!

# Usage (Assuming a general knowledge of c++)
1) Link to `PyFxCore.lib`. (From the proper directory, debug/release).
2) Place  `PyFxCore.dll` in `C:\Program Files\Adobe\Adobe After Effects 202X\Support Files`.
3) In your plugin code, use `py::gil_scoped_acquire acquire;`, and then perform whatever python stuff you'd like.
4) That's it! Simple as that! `PyFxCore.dll` will take care of python cleanup for you!
```
