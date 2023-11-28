import pygame
import sys
import random


pygame.init()


width, height = 400, 400
screen = pygame.display.set_mode((width, height))
pygame.display.set_caption("ExorSnake")

background = 30, 50, 57
food = 244, 162, 89
snake = 127, 178, 133

snake_size = 3
snake_bits = [{"x": 100, "y": 100}, {"x": 90, "y": 100}, {"x": 80, "y": 100}]
direction = "RIGHT"
change_to = direction
speed = 15

food_position = {"x": random.randrange(1, (width//10)) * 10,
                 "y": random.randrange(1, (height//10)) * 10}

game_over = False

while not game_over:
    for event in pygame.event.get():
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_UP:
                change_to = "UP"
            elif event.key == pygame.K_DOWN:
                change_to = "DOWN"
            elif event.key == pygame.K_LEFT:
                change_to = "LEFT"
            elif event.key == pygame.K_RIGHT:
                change_to = "RIGHT"

    if change_to == "UP" and not direction == "DOWN":
        direction = "UP"
    if change_to == "DOWN" and not direction == "UP":
        direction = "DOWN"
    if change_to == "LEFT" and not direction == "RIGHT":
        direction = "LEFT"
    if change_to == "RIGHT" and not direction == "LEFT":
        direction = "RIGHT"

    if direction == "UP":
        snake_bits[0]["y"] -= 10
    if direction == "DOWN":
        snake_bits[0]["y"] += 10
    if direction == "LEFT":
        snake_bits[0]["x"] -= 10
    if direction == "RIGHT":
        snake_bits[0]["x"] += 10

    if snake_bits[0]["x"] == food_position["x"] and snake_bits[0]["y"] == food_position["y"]:
        food_position = {"x": random.randrange(1, (width//10)) * 10,
                         "y": random.randrange(1, (height//10)) * 10}
        snake_size += 1
        snake_bits.append({"x": 0, "y": 0})

    for i in range(snake_size - 1, 0, -1):
        snake_bits[i]["x"] = snake_bits[i - 1]["x"]
        snake_bits[i]["y"] = snake_bits[i - 1]["y"]

    # Render
    screen.fill(background)
    pygame.draw.rect(
        screen, food, [food_position["x"], food_position["y"], 10, 10])

    for i in range(snake_size):
        pygame.draw.rect(
            screen, snake, [snake_bits[i]["x"], snake_bits[i]["y"], 10, 10])

    # Refresh the screen
    pygame.display.flip()
    pygame.time.Clock().tick(speed)


pygame.quit()
sys.exit()
