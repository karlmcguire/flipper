parse: parse.c
	gcc -lpng -o parse parse.c -I.

clean:
	rm parse
