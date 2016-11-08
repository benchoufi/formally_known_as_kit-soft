import os,sys
from skimage import io
from skimage import measure
import numpy

image_file_name1 = sys.argv[1]
image_file_name2 = sys.argv[2]

image_name1 = io.imread(image_file_name1)
image_name2 = io.imread(image_file_name2)

print image_name1.shape
print image_name2.shape

#estimate the standard deiviation of the images

std_1 = numpy.std (numpy.std (numpy.array(image_name1)))
std_2 = numpy.std (numpy.std (numpy.array(image_name2)))

print ("std is %2.10f"%std_1)

#print ("Standard deviation of the images are"%(std_1,std_2))

#estimate the peak signal to noise ratio (PSNR) between the image

peak_signal_to_noise_ratio = measure.compare_psnr (image_name1,image_name2)

print ("Peak signal to noise ratio is %s"%peak_signal_to_noise_ratio)

# estimate the mean square error between the images

mse = measure.compare_mse(image_name1,image_name2)

print  ("Mean square error between the images is %s"%mse)

# estimate the normalised root mean square error between the images

rmse = measure.compare_nrmse(image_name1,image_name2)

print  ("Normalised root mean squre error between the images is %s"%rmse)