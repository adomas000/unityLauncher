import os
import time

start_time = time.time()
count = 0
unityCount = 0
unity = []
for root, dirs, files in os.walk("D:\\UnityVersions",topdown=False):
    for name in dirs:
        print(os.path.join(root, name))
        count+=1
        if len(dirs) == 2:
            if name=="Editor":
                if os.path.isfile(os.path.join(root, name)+"\\Unity.exe"):
                    unityCount+=1
                    unity.append(os.path.join(root, dirs[0]))
                    dirs.remove(os.path.join(root, dirs[0]))
                    #print(os.path.join(root, dirs[0]))
        

print("execution time:  " , (time.time() - start_time))
print("files: ", count)
print("unityCount: ", unityCount)

for unit in unity:
    print("paths: ", unit)
