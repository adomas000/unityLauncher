import os
import time
import sys

#start_time = time.time()
#count = 0
#unityCount = 0
unity = []

for root, dirs, files in os.walk(sys.argv[1], topdown=False):
    #count+=1
    length = len(dirs)
    for name in dirs:
        #print(os.path.join(root, name))
        if length > 0 and length < 3: #most likely this is how its gonna be
            if name == "Editor":
                if os.path.isfile(os.path.join(root, name)+"\\Unity.exe"):
                    #unityCount+=1
                    #unity.append(os.path.join(root, name))
                    print(os.path.join(root, name))
                    break



# print("execution time:  " , (time.time() - start_time))
# print("files: ", count)
# print("unityCount: ", unityCount)

# for unit in unity:
#     print("paths: ", unit)
