# escape=`

#use nanoserver for the windows container
ARG fromTag=1809
ARG InstallerVersion=nanoserver
ARG InstallerRepo=mcr.microsoft.com/powershell
ARG NanoServerRepo=mcr.microsoft.com/windows/nanoserver
FROM ${InstallerRepo}:$InstallerVersion AS baseimage
USER Administrator

# Arguments for installing PowerShell, must be defined in the container they are used
ARG PS_VERSION=6.2.0
ARG PS_PACKAGE_URL=https://github.com/PowerShell/PowerShell/releases/download/v$PS_VERSION/PowerShell-$PS_VERSION-win-x64.zip
SHELL ["pwsh", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

RUN mkdir "C:/temp"
WORKDIR "C:/temp"

# get and install the specific version of node we're using
ENV NODE_VERSION 10.17.0
RUN Invoke-WebRequest $('https://nodejs.org/download/release/v{0}/node-v{0}-win-x64.zip' -f $env:NODE_VERSION) -OutFile 'node.zip'
RUN Expand-Archive node.zip -DestinationPath .
RUN del node.zip
RUN Move-Item $('node-v{0}-win-x64' -f $env:NODE_VERSION) C:\nodejs
# no MSI on nano server - use a zip file
#RUN msiexec.exe /q /i node.msi
#RUN del node.msi

#RUN setx path "%path%;C:\nodejs"
RUN setx /M PATH $($Env:PATH + ';C:\nodejs')

RUN mkdir "C:/app"
WORKDIR "C:/app"
RUN rmdir "C:/temp"

## Install app dependencies
COPY package.json ./
RUN npm install

## get the prebuilt app
COPY dist/. .
EXPOSE 8080
CMD [ "node.exe", "server.js" ]