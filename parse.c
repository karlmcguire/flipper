#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<png.h>

void
stop(const char *s) {
    printf(s);
    printf("\n");
    exit(1);
}

int
main(int argc, char **argv) {
    if(argc != 2) stop("usage: parse <filename>");

    FILE *fp = fopen(argv[1], "rb");
    if(!fp) stop("error opening file");

    char header[8];
    fread(header, 1, 8, fp);
    if(png_sig_cmp(header, 0, 8)) stop("file is not a png");

    png_structp png_ptr;
    png_ptr = png_create_read_struct(PNG_LIBPNG_VER_STRING, NULL, NULL, NULL);
    if(!png_ptr) stop("png_create_read_struct failed");

    png_infop info_ptr;
    info_ptr = png_create_info_struct(png_ptr);
    if(!info_ptr) stop("png_create_info_struct failed");

    if(setjmp(png_jmpbuf(png_ptr))) stop("error during init_io");

    png_init_io(png_ptr, fp);
    png_set_sig_bytes(png_ptr, 8);
    png_read_info(png_ptr, info_ptr);

    int width = png_get_image_width(png_ptr, info_ptr);
    int height = png_get_image_height(png_ptr, info_ptr);

    int number_of_passes = png_set_interlace_handling(png_ptr);
    png_read_update_info(png_ptr, info_ptr);

    if(setjmp(png_jmpbuf(png_ptr))) stop("error during read_image");

    png_bytep *rows = (png_bytep *) malloc(sizeof(png_bytep) * height);
    for(int i = 0; i < height; i++)
        rows[i] = (png_byte *) malloc(png_get_rowbytes(png_ptr, info_ptr));

    png_read_image(png_ptr, rows);
    fclose(fp);

    for(int i = 0; i < height; i++) {
        png_byte *r = rows[i];
        for(int a = 0; a < width; a++) {
            png_byte *p = &(r[a * 4]);
            printf("(%d, %d, %d, %d)\n", p[0], p[1], p[2], p[3]);
        }
    }

    return 0;
}
