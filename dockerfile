# Nginx alap image-et használ a statikus fájlok kiszolgálásához
FROM nginx:alpine

# A client/public/ mappában lévő index.html-t és a többi fájlt másolja át a
# Nginx webszerver alapértelmezett mappájába.
# FELTÉTELEZÉS: a futtatható frontend fájlok a client/public/ mappában vannak.
COPY client/public/ /usr/share/nginx/html