"""Utility functions for solving the travelling salesman problem."""
from dataclasses import dataclass
from geopy.distance import distance
import numpy as np
from python_tsp.exact import solve_tsp_dynamic_programming


@dataclass
class Coordinate:
    lat: float
    lon: float


def compute_distance_matrix(coordinates: list[Coordinate]) -> np.ndarray:
    mat = np.empty((len(coordinates), len(coordinates)))
    for i, coord_from in enumerate(coordinates):
        for j, coord_to in enumerate(coordinates):
            mat[i][j] = distance((coord_from.lat, coord_from.lon), (coord_to.lat, coord_to.lon)).km
    return mat


def get_best_route(coordinates: list[Coordinate]) -> list[int]:
    dist_mat = compute_distance_matrix(coordinates=coordinates)
    permutation, distance = solve_tsp_dynamic_programming(dist_mat)
    return permutation
