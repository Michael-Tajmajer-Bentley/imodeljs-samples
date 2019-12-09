# escape=`

# nanoserver just won't work, using full sized container to get POC working
FROM mcr.microsoft.com/windows/servercore:ltsc2019

# use powershell for windows container
SHELL ["powershell", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'SilentlyContinue';"]

RUN New-Item -ItemType Directory "C:\temp"
WORKDIR "C:\temp"

# get and install the specific version of node we're using
# no MSI on nano server - use a zip file
ENV NODE_VERSION 10.17.0
RUN Invoke-WebRequest $('https://nodejs.org/download/release/v{0}/node-v{0}-win-x64.zip' -f $env:NODE_VERSION) -OutFile "node.zip"
RUN Expand-Archive "node.zip" -DestinationPath "."
RUN Remove-Item "node.zip"
RUN Move-Item $('node-v{0}-win-x64' -f $env:NODE_VERSION) "C:\nodejs"

# get c++ runtimes needed for bentley node modules
RUN Invoke-WebRequest "https://aka.ms/vs/16/release/vc_redist.x64.exe" -OutFile "vc_redist.x64.exe"
RUN Start-Process "c:\temp\vc_redist.x64.exe" -Wait -ArgumentList @('/quiet', '/install', '/passive', '/norestart')
RUN Remove-Item "vc_redist.x64.exe"

# add node to the path
RUN setx /M PATH $($Env:PATH + ';C:\nodejs')

# setup the agent
RUN New-Item -ItemType Directory "C:\app"
WORKDIR "C:\app"

## Install app dependencies
COPY package.json ./
RUN npm install

## get the prebuilt app
COPY dist/. .

# cleanup the temp folder
RUN Remove-Item "C:\temp"

# ports
EXPOSE 8080
EXPOSE 3000

# start the agent
CMD [ "node.exe", "Main.js" ]