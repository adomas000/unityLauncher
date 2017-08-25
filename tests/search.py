
import os
#import time
import sys

#start_time = time.time()
#count = 0
#unityCount = 0
#unity = []

root = sys.argv[1]
#print(root)
for item in os.listdir(root):
    #print(os.path.join(root, item))
    if os.path.isfile(os.path.join(root, item) + "\\Editor\\Unity.exe"):
        print(os.path.join(root, item) + "\\Editor\\")
        #count+=1

#print("Unity found: ", count)
#print("execution time:  " , (time.time() - start_time),"s")