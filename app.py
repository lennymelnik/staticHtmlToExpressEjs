import os
import shutil
import codecs
from bs4 import BeautifulSoup
cwd = os.getcwd()
from shutil import copyfile








def AllFiles():
    rootdir = 'C:/Users/sid/Desktop/test'

    for subdir, dirs, files in os.walk(cwd+"/melniklawgroup"):
        for file in files:
            filePath = os.path.join(subdir, file)
            infilePath = filePath
            outfilePath = filePath.replace("/melniklawgroup","/mlg/pages")
            
            if (infilePath.endswith(".html")):
             
                infile = codecs.open(infilePath, 'r')
                outfile = codecs.open(outfilePath.replace(".html",".ejs"),'w')
                print("HTML FILE") 
                print(os.path.join(subdir, file))       
                data = infile.read()
                soup = BeautifulSoup(data)
                if ('<td height="800' in data): 
                    firstPar = data.find('id="MainZone">')
                    print(soup.find(id='MainZone'))
                    secondPar = firstPar + 7 + data[firstPar:-1].find('</div>')
                    data = data[firstPar:secondPar]
                    
                    outfile.write(str(soup.find(id='MainZone')))
            else:
       
                copyfile(infilePath, outfilePath)
              
AllFiles()



def copyDirectoryTree():

    inputpath = cwd+"/melniklawgroup"
    outputpath = cwd+"/mlg/pages"
    #use command
    os.system('rsync -a -f"+ */" -f"- *" '+inputpath+'/ '+outputpath+'/')

